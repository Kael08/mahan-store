'use client';

import { useState, useMemo } from 'react';
import { TProduct } from '../types/product.types';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface ProductsPageClientProps {
  initialProducts: TProduct[];
}

export default function ProductsPageClient({
  initialProducts,
}: ProductsPageClientProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<TProduct[]>(initialProducts);

  return (
    <main>
      <div className="products-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Каталог товаров
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length === 0
              ? 'Товары не найдены'
              : `Найдено товаров: ${filteredProducts.length}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Фильтры */}
          <div className="lg:col-span-1">
            <ProductFilters
              products={initialProducts}
              onFilterChange={setFilteredProducts}
            />
          </div>

          {/* Список товаров */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Товары не найдены</p>
                <p className="text-gray-400 text-sm mt-2">
                  Попробуйте изменить фильтры или зайти позже
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
