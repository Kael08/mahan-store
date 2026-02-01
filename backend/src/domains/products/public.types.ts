import { ProductEntity } from './main/entities/product.entity';

export type TProduct = ProductEntity;

export type TCreateProduct = Omit<
  ProductEntity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'seller'
  | 'brand'
  | 'variants'
  | 'images'
  | 'links'
> & {
  sellerId: number;
  brandId: number;
  categoryId: number;
};

export type TUpdateProduct = Omit<
  ProductEntity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'seller'
  | 'brand'
  | 'variants'
  | 'images'
  | 'links'
> & {
  sellerId: number;
  brandId: number;
  categoryId: number;
};
