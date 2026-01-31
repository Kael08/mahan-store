import { ProductVariantEntity } from './main/entities/productVariants.entity';

export type TProductVariant = ProductVariantEntity;

export type TCreateProductVariant = Omit<
  TProductVariant,
  'id' | 'product' | 'createdAt' | 'updatedAt'
> & { productId: number };

export type TUpdateProductVariant = Omit<
  TProductVariant,
  'id' | 'product' | 'createdAt' | 'updatedAt'
> & { productId: number };
