'use client';

import { useState, useEffect } from 'react';
import { TProductImage } from '../types/product.types';
import ProductImage from './ProductImage';

interface ImageGalleryProps {
  images: TProductImage[];
  productTitle: string;
}

export default function ImageGallery({
  images,
  productTitle,
}: ImageGalleryProps) {
  // Сортируем изображения: сначала главное, потом остальные по sortOrder
  const sortedImages = [...images].sort((a, b) => {
    if (a.isMain) return -1;
    if (b.isMain) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = sortedImages[selectedIndex];

  // Обновляем индекс при изменении изображений
  useEffect(() => {
    if (sortedImages.length > 0 && selectedIndex >= sortedImages.length) {
      setSelectedIndex(0);
    }
  }, [sortedImages.length, selectedIndex]);

  if (sortedImages.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-md flex items-center justify-center">
        <div className="text-gray-400">Нет фото</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Главное изображение */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-md">
        {currentImage && (
          <ProductImage
            src={currentImage.imageUrl}
            alt={`${productTitle} - изображение ${currentImage.sortOrder || selectedIndex + 1}`}
            className="w-full h-full object-cover"
            fallback="https://via.placeholder.com/600x600?text=Нет+фото"
          />
        )}
      </div>

      {/* Миниатюры */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition-all ${
                selectedIndex === index
                  ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105'
                  : 'hover:opacity-75 hover:scale-105'
              }`}
            >
              <ProductImage
                src={image.imageUrl}
                alt={`${productTitle} - миниатюра ${image.sortOrder || index + 1}`}
                className="w-full h-full object-cover"
                fallback="https://via.placeholder.com/150x150?text=Нет+фото"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
