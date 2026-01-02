import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import { TProducts, TCreateProducts, TUpdateProducts } from '../public.types';
import { Repository } from 'typeorm';
import { S3Service } from 'src/common/s3/s3.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly repo: Repository<ProductsEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<TProducts[]> {
    return this.repo.find();
  }

  async findOneById(id: number): Promise<TProducts> {
    return this.repo.findOneByOrFail({ id });
  }

  async create(data: TCreateProducts): Promise<TProducts> {
    let imageUrl: string | undefined;

    if(data.image){
      imageUrl = await this.s3Service.uploadFile(data.image)
      delete (data as any).image
    }

    const product = this.repo.create({
      ...data, 
      imageUrl
    });

    return this.repo.save(product);
  }

  async update(id: number, data: TUpdateProducts): Promise<TProducts> {
    let imageUrl: string | undefined

    if(data.image){
      imageUrl = await this.s3Service.uploadFile(data.image)
      delete (data as any).image;
      
      const oldProduct = await this.repo.findOneBy({id})
      if(oldProduct?.imageUrl) {
        const oldKey = oldProduct.imageUrl.split('/').slice(-1)[0];
        await this.s3Service.deleteFile(oldKey)
      }
    }

    await this.repo.update(id, {...data, imageUrl});
    return this.repo.findOneByOrFail({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
