import { SellerEntity } from './main/entities/seller.entity';

export type TSeller = SellerEntity;

export type TCreateSeller = Omit<
  SellerEntity,
  'id' | 'createdAt' | 'updatedAt' | 'products' | 'passwordHash'
> & {
  password: string;
  image?: Express.Multer.File;
};
