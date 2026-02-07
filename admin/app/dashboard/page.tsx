'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../utils/api';
import type { TProduct } from '../types/product.types';

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get<TProduct[]>('/AD/products');
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      await api.delete(`/AD/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Ошибка удаления товара');
    }
  };

  if (loading) {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Товары</h1>
        <button
          onClick={() => router.push('/dashboard/products/new')}
          className="admin-button-primary"
        >
          + Создать товар
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="admin-card text-center py-12">
          <p className="text-gray-600 mb-4">Товаров пока нет</p>
          <button
            onClick={() => router.push('/dashboard/products/new')}
            className="admin-button-primary"
          >
            Создать первый товар
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const mainImage =
              product.images?.find((img) => img.isMain) || product.images?.[0];

            return (
              <div key={product.id} className="admin-card">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  {mainImage?.imageUrl ? (
                    <img
                      src={mainImage.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Нет фото
                    </div>
                  )}
                  {!product.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Неактивен
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="text-sm text-gray-600 mb-2">
                  <p>
                    <span className="font-medium">Бренд:</span>{' '}
                    {product.brand?.name || 'Без бренда'}
                  </p>
                  <p>
                    <span className="font-medium">Категория:</span>{' '}
                    {product.category?.name}
                  </p>
                  <p>
                    <span className="font-medium">Продавец:</span>{' '}
                    {product.seller?.name}
                  </p>
                </div>

                <div className="text-lg font-bold text-indigo-700 mb-4">
                  {product.priceMin && product.priceMax
                    ? product.priceMin === product.priceMax
                      ? `${Number(product.priceMin).toLocaleString('ru-RU')} ₽`
                      : `от ${Number(product.priceMin).toLocaleString('ru-RU')} до ${Number(product.priceMax).toLocaleString('ru-RU')} ₽`
                    : 'Цена по запросу'}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/products/${product.id}`)
                    }
                    className="admin-button-secondary flex-1"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="admin-button-danger"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
