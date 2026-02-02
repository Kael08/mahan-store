export interface TSeller {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  description?: string;
  isActive: boolean;
  maxProducts: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface TBrand {
  id: number;
  name: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

export interface TProductImage {
  id: number;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface TProductLink {
  id: number;
  url: string;
  platform: string;
  label: string;
  sortOrder: number;
  created_at: string;
}

export interface TProduct {
  id: number;
  title: string;
  description?: string;
  priceMin?: string;
  priceMax?: string;
  isActive: boolean;
  priorityBoost: number;
  createdAt: string;
  updatedAt: string;
  seller: TSeller;
  brand?: TBrand;
  category?: TCategory;
  variants: TProductVariant[];
  images: TProductImage[];
  links: TProductLink[];
}
