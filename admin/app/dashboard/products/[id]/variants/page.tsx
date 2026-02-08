'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../../utils/api';
import type {
  TProduct,
  TProductVariant,
} from '../../../../types/product.types';

export default function ProductVariantsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<TProduct | null>(null);
  const [variants, setVariants] = useState<TProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<TProductVariant | null>(
    null
  );

  const [formData, setFormData] = useState({
    color: '',
    size: '',
    stockStatus: 'in_stock' as 'in_stock' | 'out_of_stock',
    price: '',
  });

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const productData = await api.get<TProduct>(`/AD/products/${productId}`);
      setProduct(productData);
      setVariants(productData.variants || []);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingVariant) {
        await api.patch(`/AD/productVariants/${editingVariant.id}`, {
          productId,
          ...formData,
          price: Number(formData.price),
        });
      } else {
        await api.post('/AD/productVariants', {
          productId,
          ...formData,
          price: Number(formData.price),
        });
      }
      await loadData();
      setShowForm(false);
      setEditingVariant(null);
      setFormData({ color: '', size: '', stockStatus: 'in_stock', price: '' });
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения варианта');
    }
  };

  const handleEdit = (variant: TProductVariant) => {
    setEditingVariant(variant);
    setFormData({
      color: variant.color,
      size: variant.size,
      stockStatus: variant.stockStatus,
      price: variant.price,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот вариант?')) {
      return;
    }

    try {
      await api.delete(`/AD/productVariants/${id}`);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления варианта');
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Назад к товару
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Варианты: {product?.title}
            </h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingVariant(null);
                setFormData({
                  color: '',
                  size: '',
                  stockStatus: 'in_stock',
                  price: '',
                });
              }}
              className="admin-button-primary"
            >
              {showForm ? 'Отмена' : '+ Добавить вариант'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="admin-card mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Цвет *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="admin-label">Размер *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Статус *</label>
                <select
                  required
                  className="admin-input"
                  value={formData.stockStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stockStatus: e.target.value as
                        | 'in_stock'
                        | 'out_of_stock',
                    })
                  }
                >
                  <option value="in_stock">В наличии</option>
                  <option value="out_of_stock">Нет в наличии</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Цена *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="admin-input"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="admin-button-primary flex-1">
                {editingVariant ? 'Сохранить изменения' : 'Создать вариант'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingVariant(null);
                }}
                className="admin-button-secondary"
              >
                Отмена
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((variant) => (
            <div key={variant.id} className="admin-card">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Цвет:</span> {variant.color}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Размер:</span> {variant.size}
                </div>
                <div className="text-lg font-bold text-indigo-700 mb-2">
                  {Number(variant.price).toLocaleString('ru-RU')} ₽
                </div>
                <div
                  className={`text-sm font-medium ${
                    variant.stockStatus === 'in_stock'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {variant.stockStatus === 'in_stock'
                    ? 'В наличии'
                    : 'Нет в наличии'}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(variant)}
                  className="admin-button-secondary flex-1 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(variant.id)}
                  className="admin-button-danger text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {variants.length === 0 && !showForm && (
          <div className="admin-card text-center py-12">
            <p className="text-gray-600 mb-4">Вариантов пока нет</p>
            <button
              onClick={() => setShowForm(true)}
              className="admin-button-primary"
            >
              Добавить первый вариант
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
