import { BrandEntity } from './main/entities/brands.entity';

export type TBrand = BrandEntity;

export type TCreateBrand = Omit<
  BrandEntity,
  'id' | 'createdAt' | 'updatedAt' | 'products'
> & {
  image?: Express.Multer.File;
};

export type TUpdateBrand = Omit<
  BrandEntity,
  'id' | 'createdAt' | 'updatedAt' | 'products'
> & {
  image?: Express.Multer.File;
};
