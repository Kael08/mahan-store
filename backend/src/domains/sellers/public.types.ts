import { SellerEntity } from './main/entities/seller.entity';

export type TSeller = SellerEntity;

export type TCreateSeller = Omit<
  SellerEntity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'products'
  | 'passwordHash'
  | 'refreshTokens'
> & {
  password: string;
  image?: Express.Multer.File;
};

export type TUpdateSeller = Omit<
  SellerEntity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'products'
  | 'passwordHash'
  | 'refreshTokens'
> & {
  password: string;
  image?: Express.Multer.File;
};
