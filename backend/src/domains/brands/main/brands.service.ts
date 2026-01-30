import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brands.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/common/s3/s3.service';
import { TBrand, TCreateBrand, TUpdateBrand } from '../public.types';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly repo: Repository<BrandEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<TBrand[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<TBrand> {
    return this.repo.findOneByOrFail({ id });
  }

  async create(data: TCreateBrand): Promise<TBrand> {
    let logoUrl: string | undefined;

    if (data.image) {
      logoUrl = await this.s3Service.uploadFile(
        data.image,
        `brands/${Date.now()}-${data.name}`,
      );
      delete (data as any).image;
    }

    const brand = this.repo.create({ ...data, logoUrl: logoUrl });
    return this.repo.save(brand);
  }

  async update(id: number, data: TUpdateBrand): Promise<TBrand> {
    let existingBrand = await this.repo.findOneByOrFail({ id });
    let logoUrl: string | undefined;

    if (data.image) {
      logoUrl = await this.s3Service.uploadFile(
        data.image,
        `brands/${Date.now()}-${data.name}`,
      );

      if (existingBrand.logoUrl) {
        const oldKey = this.s3Service.extractKeyFromUrl(existingBrand.logoUrl);
        await this.s3Service.deleteFile(oldKey);
      }

      delete (data as any).image;
    }

    const updateData = {
      ...data,
      logoUrl,
    };

    await this.repo.update(id, updateData);
    return this.repo.findOneByOrFail({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
