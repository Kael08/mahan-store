export interface TProductImage {
  id: number;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface TProductVariant {
  id: number;
  color: string;
  size: string;
  stockStatus: 'in_stock' | 'out_of_stock';
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface TProductLink {
  id: number;
  url: string;
  platform: string;
  label: string;
  sortOrder: number;
  created_at: string;
}

export interface TBrand {
  id: number;
  name: string;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TSeller {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  description: string | null;
  isActive: boolean;
  maxProducts: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface TProduct {
  id: number;
  title: string;
  description: string;
  priceMin: string | null;
  priceMax: string | null;
  isActive: boolean;
  priorityBoost: number;
  createdAt: string;
  updatedAt: string;
  seller: TSeller;
  category: TCategory;
  brand: TBrand;
  variants: TProductVariant[];
  images: TProductImage[];
  links: TProductLink[];
}

export interface CreateProductDto {
  title: string;
  description: string;
  priceMin?: number;
  priceMax?: number;
  sellerId: number;
  brandId: number;
  categoryId: number;
  priorityBoost: number;
  isActive: boolean;
}

export interface UpdateProductDto extends CreateProductDto {}
