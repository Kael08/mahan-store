import { CategoryEntity } from './main/entities/categories.entity';

export type TCategory = CategoryEntity;

export type TCreateCategory = Omit<
  CategoryEntity,
  'id' | 'products' | 'parent' | 'children' | 'createdAt' | 'updatedAt'
> & {
  parentId?: number;
};

export type TUpdateCategory = Omit<
  CategoryEntity,
  'id' | 'products' | 'parent' | 'children' | 'createdAt' | 'updatedAt'
> & {
  parentId?: number;
};
