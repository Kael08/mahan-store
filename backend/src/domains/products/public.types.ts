import { ProductsEntity } from './main/entities/products.entity'

export type TProducts = ProductsEntity

export type TCreateProducts = Omit<ProductsEntity, 'id' | 'createdAt' | 'updatedAt'> 

export type TUpdateProducts = Partial<Omit<ProductsEntity,'id' | 'createdAt' | 'updatedAt'>>