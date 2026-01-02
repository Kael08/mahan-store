import { ProductsEntity } from './main/entities/products.entity';

export type TProducts = ProductsEntity;

export type TCreateProducts = Omit<
  ProductsEntity,
  'id' | 'createdAt' | 'updatedAt'
> & {
  image: Express.Multer.File;
};

export type TUpdateProducts = Partial<
  Omit<ProductsEntity, 'id' | 'createdAt' | 'updatedAt'>
> & {
  image?: Express.Multer.File;
};
