import { ProductImageEntity } from './main/entities/productImages.entity';

export type TProductImage = ProductImageEntity;

export type TCreateProductImage = Omit<
  ProductImageEntity,
  'id' | 'product' | 'createdAt' | 'imageUrl'
> & {
  productId: number;
  image: Express.Multer.File;
};
