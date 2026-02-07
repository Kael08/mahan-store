'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../utils/api';
import type {
  UpdateProductDto,
  TProduct,
  TBrand,
  TCategory,
} from '../../../types/product.types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [brands, setBrands] = useState<TBrand[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);

  const [formData, setFormData] = useState<UpdateProductDto>({
    title: '',
    description: '',
    priceMin: undefined,
    priceMax: undefined,
    sellerId: 0,
    brandId: 0,
    categoryId: 0,
    priorityBoost: 0,
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    try {
      setLoadingProduct(true);
      const [product, brandsData, categoriesData] = await Promise.all([
        api.get<TProduct>(`/AD/products/${productId}`),
        api.get<TBrand[]>('/AD/brands'),
        api.get<TCategory[]>('/AD/categories'),
      ]);

      setBrands(brandsData);
      setCategories(categoriesData);

      setFormData({
        title: product.title,
        description: product.description,
        priceMin: product.priceMin ? Number(product.priceMin) : undefined,
        priceMax: product.priceMax ? Number(product.priceMax) : undefined,
        sellerId: product.seller.id,
        brandId: product.brand.id,
        categoryId: product.category.id,
        priorityBoost: product.priorityBoost,
        isActive: product.isActive,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.patch(`/AD/products/${productId}`, formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления товара');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="admin-container">
        <div className="text-center py-12">
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Назад
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Редактировать товар
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-card space-y-6">
          <div>
            <label htmlFor="title" className="admin-label">
              Название товара *
            </label>
            <input
              id="title"
              type="text"
              required
              className="admin-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="description" className="admin-label">
              Описание *
            </label>
            <textarea
              id="description"
              required
              rows={6}
              className="admin-input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priceMin" className="admin-label">
                Минимальная цена
              </label>
              <input
                id="priceMin"
                type="number"
                min="0"
                step="0.01"
                className="admin-input"
                value={formData.priceMin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceMin: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="priceMax" className="admin-label">
                Максимальная цена
              </label>
              <input
                id="priceMax"
                type="number"
                min="0"
                step="0.01"
                className="admin-input"
                value={formData.priceMax || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceMax: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="brandId" className="admin-label">
              Бренд *
            </label>
            <select
              id="brandId"
              required
              className="admin-input"
              value={formData.brandId}
              onChange={(e) =>
                setFormData({ ...formData, brandId: Number(e.target.value) })
              }
            >
              <option value={0}>Выберите бренд</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="categoryId" className="admin-label">
              Категория *
            </label>
            <select
              id="categoryId"
              required
              className="admin-input"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: Number(e.target.value) })
              }
            >
              <option value={0}>Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priorityBoost" className="admin-label">
              Приоритет (0-100)
            </label>
            <input
              id="priorityBoost"
              type="number"
              min="0"
              max="100"
              className="admin-input"
              value={formData.priorityBoost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priorityBoost: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Товар активен
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="admin-button-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="admin-button-secondary"
            >
              Отмена
            </button>
          </div>
        </form>

        {/* Управление связанными данными */}
        <div className="admin-card mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Управление товаром
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                router.push(`/dashboard/products/${productId}/images`)
              }
              className="admin-button-secondary text-left p-4"
            >
              <div className="font-medium mb-1">Изображения</div>
              <div className="text-sm text-gray-600">
                Управление фотографиями товара
              </div>
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/products/${productId}/variants`)
              }
              className="admin-button-secondary text-left p-4"
            >
              <div className="font-medium mb-1">Варианты</div>
              <div className="text-sm text-gray-600">Размеры, цвета, цены</div>
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/products/${productId}/links`)
              }
              className="admin-button-secondary text-left p-4"
            >
              <div className="font-medium mb-1">Ссылки</div>
              <div className="text-sm text-gray-600">Контакты продавца</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
