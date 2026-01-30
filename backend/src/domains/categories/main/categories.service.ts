import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { TCategory, TCreateCategory, TUpdateCategory } from '../public.types';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<TCategory[]> {
    return this.repo.find({
      relations: ['parent', 'children'],
    });
  }

  async findOneById(id: number): Promise<TCategory> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async create(data: TCreateCategory): Promise<TCategory> {
    let parent: TCategory | undefined;

    if (data.parentId) {
      const parentExists = await this.repo.findOneBy({ id: data.parentId });
      if (!parentExists) {
        throw new NotFoundException(
          `Родительская категория с id ${data.parentId} не найдена`,
        );
      }

      parent = parentExists;
    }

    delete (data as any).parentId;

    const category = this.repo.create({
      ...data,
      parent,
    });

    return this.repo.save(category);
  }

  async update(id: number, data: TUpdateCategory): Promise<TCategory> {
    let parent: TCategory | undefined;

    if (data.parentId) {
      const parentExists = await this.repo.findOneBy({ id: data.parentId });
      if (!parentExists) {
        throw new NotFoundException(
          `Родительская категория с id ${data.parentId} не найдена`,
        );
      }

      parent = parentExists;
    }

    delete (data as any).parentId;

    await this.repo.update(id, {
      ...data,
      parent,
    });

    return this.repo.findOneByOrFail({ id });
  }
}
