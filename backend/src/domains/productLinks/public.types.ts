import { ProductLinkEntity } from './main/entities/productLinks.entity';

export type TProductLink = ProductLinkEntity;

export type TCreateProductLink = Omit<
  TProductLink,
  'id' | 'product' | 'created_at'
> & { productId: number };
