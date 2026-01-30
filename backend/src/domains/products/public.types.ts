import { ProductEntity } from './main/entities/product.entity';

export type TProduct = ProductEntity;

export type TCreateProduct = Omit<
  ProductEntity,
  'id' | 'createdAt' | 'updatedAt'
> & {
  image: Express.Multer.File;
};

export type TUpdateProduct = Partial<
  Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>
> & {
  image?: Express.Multer.File;
};
