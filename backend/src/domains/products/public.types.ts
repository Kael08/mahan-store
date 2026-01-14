import { ProductEntity } from './main/entities/product.entity';

export type TProducts = ProductEntity;

export type TCreateProducts = Omit<
  ProductEntity,
  'id' | 'createdAt' | 'updatedAt'
> & {
  image: Express.Multer.File;
};

export type TUpdateProducts = Partial<
  Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>
> & {
  image?: Express.Multer.File;
};
