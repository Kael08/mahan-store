import { Injectable } from '@nestjs/common';
import { ProductLinksService } from './main/productLinks.service';
import { TCreateProductLink, TProductLink } from './public.types';

@Injectable()
export class ProductLinksPublicService {
  constructor(private readonly service: ProductLinksService) {}

  async findAll(): Promise<TProductLink[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TProductLink> {
    return this.service.findOneById(id);
  }

  async create(data: TCreateProductLink): Promise<TProductLink> {
    return this.service.create(data);
  }

  async delete(id: number): Promise<void> {
    return this.service.delete(id);
  }
}
