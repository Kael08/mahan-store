import { Injectable } from '@nestjs/common';
import { CategoriesService } from './main/categories.service';
import { TCategory, TCreateCategory, TUpdateCategory } from './public.types';

@Injectable()
export class CategoriesPublicService {
  constructor(private readonly service: CategoriesService) {}

  async findAll(): Promise<TCategory[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TCategory> {
    return this.service.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    return this.service.delete(id);
  }

  async create(data: TCreateCategory): Promise<TCategory> {
    return this.service.create(data);
  }

  async update(id: number, data: TUpdateCategory): Promise<TCategory> {
    return this.service.update(id, data);
  }
}
