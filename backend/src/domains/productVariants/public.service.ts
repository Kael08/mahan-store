import { Injectable } from '@nestjs/common';
import { ProductVariantsService } from './main/productVariants.service';
import { TCreateProductVariant, TProductVariant } from './public.types';

@Injectable()
export class ProductVariantsPublicService {
  constructor(private readonly service: ProductVariantsService) {}

  async findAll(): Promise<TProductVariant[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TProductVariant> {
    return this.service.findOneById(id);
  }

  async create(data: TCreateProductVariant): Promise<TProductVariant> {
    return this.service.create(data);
  }

  async update(
    id: number,
    data: TCreateProductVariant,
  ): Promise<TProductVariant> {
    return this.service.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.service.delete(id);
  }
}
