import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerEntity } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { TSeller, TCreateSeller, TUpdateSeller } from '../public.types';
import { S3Service } from 'src/common/s3/s3.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly repo: Repository<SellerEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<TSeller[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<TSeller> {
    return this.repo.findOneByOrFail({ id });
  }

  async create(data: TCreateSeller): Promise<TSeller> {
    let avatarUrl: string | undefined;

    if (data.image) {
      avatarUrl = await this.s3Service.uploadFile(
        data.image,
        `sellers/${Date.now()}-avatar`,
      );
      delete (data as any).image;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    let sellerData = { ...data, passwordHash: hashedPassword };
    delete (sellerData as any).password;

    const seller = this.repo.create({ ...sellerData, avatarUrl });
    return this.repo.save(seller);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async update(id: number, data: TUpdateSeller): Promise<TSeller> {
    let existingSeller = await this.repo.findOneByOrFail({ id });

    let avatarUrl: string | undefined;

    if (data.image) {
      avatarUrl = await this.s3Service.uploadFile(
        data.image,
        `sellers/${Date.now()}-avatar`,
      );

      if (existingSeller.avatarUrl) {
        const oldKey = existingSeller.avatarUrl.split('/').pop()!;
        await this.s3Service.deleteFile(oldKey);
      }

      delete (data as any).image;
    }

    let passwordHash: string | undefined = existingSeller.passwordHash;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
      delete (data as any).password;
    }

    const updateData = {
      ...data,
      passwordHash,
      avatarUrl,
    };

    await this.repo.update(id, updateData);

    return this.repo.findOneByOrFail({ id });
  }
}
