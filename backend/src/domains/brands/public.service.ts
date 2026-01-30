import { Injectable } from '@nestjs/common';
import { BrandsService } from './main/brands.service';
import { TBrand, TCreateBrand, TUpdateBrand } from './public.types';

@Injectable()
export class BrandsPublicService {
  constructor(private readonly service: BrandsService) {}

  async findAll(): Promise<TBrand[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TBrand> {
    return this.service.findOneById(id);
  }

  async create(data: TCreateBrand): Promise<TBrand> {
    return this.service.create(data);
  }

  async update(id: number, data: TUpdateBrand): Promise<TBrand> {
    return this.service.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.service.delete(id);
  }
}
