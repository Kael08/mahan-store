'use client';

import Link from 'next/link';
import { TProduct } from '../types/product.types';
import { useState } from 'react';
import AvatarImage from './AvatarImage';

interface ProductCardProps {
  product: TProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage =
    product.images?.find((img) => img.isMain) || product.images?.[0];
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/products/${product.id}`} className="product-card group">
      {/* Картинка */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
        {mainImage?.imageUrl && !imageError ? (
          <img
            src={mainImage.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Нет фото
          </div>
        )}

        {/* Бейдж статуса */}
        {!product.isActive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Неактивен
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="p-5 flex flex-col gap-3 border-t border-gray-100">
        {/* Бренд и категория */}
        <div className="flex items-center gap-2 text-sm">
          {product.brand?.logoUrl && (
            <img
              src={product.brand.logoUrl}
              alt={product.brand.name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="text-gray-600 font-medium">
            {product.brand?.name || 'Без бренда'}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{product.category?.name}</span>
        </div>

        {/* Заголовок */}
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h2>

        {/* Цена */}
        <div className="text-lg font-bold text-indigo-700">
          {product.priceMin && product.priceMax
            ? product.priceMin === product.priceMax
              ? `${Number(product.priceMin).toLocaleString('ru-RU')} ₽`
              : `от ${Number(product.priceMin).toLocaleString('ru-RU')} до ${Number(product.priceMax).toLocaleString('ru-RU')} ₽`
            : 'Цена по запросу'}
        </div>

        {/* Продавец */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {product.seller?.avatarUrl && (
            <AvatarImage
              src={product.seller.avatarUrl}
              alt={product.seller.name}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <span>Продавец: {product.seller?.name}</span>
        </div>

        {/* Описание */}
        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
}
