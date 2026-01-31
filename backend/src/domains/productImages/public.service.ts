import { Injectable } from '@nestjs/common';
import { ProductImagesService } from './main/productImages.service';
import { TCreateProductImage, TProductImage } from './public.types';

@Injectable()
export class ProductImagesPublicService {
  constructor(private readonly service: ProductImagesService) {}

  async findAll(): Promise<TProductImage[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TProductImage> {
    return this.service.findOneById(id);
  }

  async create(data: TCreateProductImage): Promise<TProductImage> {
    return this.service.create(data);
  }

  async delete(id: number): Promise<void> {
    return this.service.delete(id);
  }
}
