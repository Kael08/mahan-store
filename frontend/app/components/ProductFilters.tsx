'use client';

import { useState, useMemo, useEffect } from 'react';
import { TProduct, TBrand, TCategory, TSeller } from '../types/product.types';

interface ProductFiltersProps {
  products: TProduct[];
  onFilterChange: (filteredProducts: TProduct[]) => void;
}

export default function ProductFilters({
  products,
  onFilterChange,
}: ProductFiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSellers, setSelectedSellers] = useState<number[]>([]);

  // Извлекаем уникальные значения из продуктов
  const brands = useMemo(() => {
    const brandMap = new Map<number, TBrand>();
    products.forEach((product) => {
      if (product.brand) {
        brandMap.set(product.brand.id, product.brand);
      }
    });
    return Array.from(brandMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products]);

  const categories = useMemo(() => {
    const categoryMap = new Map<number, TCategory>();
    products.forEach((product) => {
      if (product.category) {
        categoryMap.set(product.category.id, product.category);
      }
    });
    return Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products]);

  const sellers = useMemo(() => {
    const sellerMap = new Map<number, TSeller>();
    products.forEach((product) => {
      if (product.seller) {
        sellerMap.set(product.seller.id, product.seller);
      }
    });
    return Array.from(sellerMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products]);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 ||
        (product.brand && selectedBrands.includes(product.brand.id));
      const categoryMatch =
        selectedCategories.length === 0 ||
        (product.category && selectedCategories.includes(product.category.id));
      const sellerMatch =
        selectedSellers.length === 0 ||
        (product.seller && selectedSellers.includes(product.seller.id));

      return brandMatch && categoryMatch && sellerMatch;
    });
  }, [products, selectedBrands, selectedCategories, selectedSellers]);

  // Обновляем отфильтрованные продукты при изменении фильтров
  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSeller = (sellerId: number) => {
    setSelectedSellers((prev) =>
      prev.includes(sellerId)
        ? prev.filter((id) => id !== sellerId)
        : [...prev, sellerId]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSellers([]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSellers.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Фильтры</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Сбросить все
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Фильтр по брендам */}
        {brands.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Бренды</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Фильтр по категориям */}
        {categories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Категории
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Фильтр по продавцам */}
        {sellers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Продавцы
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sellers.map((seller) => (
                <label
                  key={seller.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedSellers.includes(seller.id)}
                    onChange={() => toggleSeller(seller.id)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{seller.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
