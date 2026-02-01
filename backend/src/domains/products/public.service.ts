import { Injectable } from '@nestjs/common';
import { ProductsService } from './main/products.service';
import { TProduct, TCreateProduct, TUpdateProduct } from './public.types';

@Injectable()
export class ProductsPublicService {
  constructor(private readonly productsService: ProductsService) {}

  async findAll(): Promise<TProduct[]> {
    return this.productsService.findAll();
  }

  async findOneById(id: number): Promise<TProduct> {
    return this.productsService.findOneById(id);
  }

  async create(data: TCreateProduct): Promise<TProduct> {
    return this.productsService.create(data);
  }

  async update(id: number, data: TUpdateProduct): Promise<TProduct> {
    return this.productsService.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.productsService.delete(id);
  }
}
