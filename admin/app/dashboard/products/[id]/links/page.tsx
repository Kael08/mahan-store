'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../../utils/api';
import type { TProduct, TProductLink } from '../../../../types/product.types';

export default function ProductLinksPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<TProduct | null>(null);
  const [links, setLinks] = useState<TProductLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<TProductLink | null>(null);

  const [formData, setFormData] = useState({
    url: '',
    platform: '',
    label: '',
    sortOrder: 0,
  });

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const productData = await api.get<TProduct>(`/AD/products/${productId}`);
      setProduct(productData);
      setLinks(
        (productData.links || []).sort((a, b) => a.sortOrder - b.sortOrder)
      );
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
      if (editingLink) {
        // Для обновления нужно использовать PATCH, но его нет в контроллере
        // Пока просто удаляем и создаем заново
        await api.delete(`/AD/productLinks/${editingLink.id}`);
      }

      await api.post('/AD/productLinks', {
        productId,
        ...formData,
        sortOrder: Number(formData.sortOrder),
      });

      await loadData();
      setShowForm(false);
      setEditingLink(null);
      setFormData({ url: '', platform: '', label: '', sortOrder: 0 });
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения ссылки');
    }
  };

  const handleEdit = (link: TProductLink) => {
    setEditingLink(link);
    setFormData({
      url: link.url,
      platform: link.platform,
      label: link.label,
      sortOrder: link.sortOrder,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту ссылку?')) {
      return;
    }

    try {
      await api.delete(`/AD/productLinks/${id}`);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления ссылки');
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
              Ссылки: {product?.title}
            </h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingLink(null);
                setFormData({
                  url: '',
                  platform: '',
                  label: '',
                  sortOrder: links.length,
                });
              }}
              className="admin-button-primary"
            >
              {showForm ? 'Отмена' : '+ Добавить ссылку'}
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
            <div>
              <label className="admin-label">URL *</label>
              <input
                type="url"
                required
                className="admin-input"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Платформа *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  placeholder="telegram, whatsapp, etc."
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="admin-label">Подпись *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  placeholder="Написать продавцу"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Порядок сортировки</label>
              <input
                type="number"
                min="0"
                className="admin-input"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="admin-button-primary flex-1">
                {editingLink ? 'Сохранить изменения' : 'Создать ссылку'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingLink(null);
                }}
                className="admin-button-secondary"
              >
                Отмена
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="admin-card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">
                    {link.label}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Платформа:</span>{' '}
                    {link.platform}
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm break-all"
                  >
                    {link.url}
                  </a>
                  <div className="text-xs text-gray-500 mt-2">
                    Порядок: {link.sortOrder}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(link)}
                    className="admin-button-secondary text-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="admin-button-danger text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {links.length === 0 && !showForm && (
          <div className="admin-card text-center py-12">
            <p className="text-gray-600 mb-4">Ссылок пока нет</p>
            <button
              onClick={() => setShowForm(true)}
              className="admin-button-primary"
            >
              Добавить первую ссылку
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
