'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../../utils/api';
import type { TProduct, TProductImage } from '../../../../types/product.types';

export default function ProductImagesPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<TProduct | null>(null);
  const [images, setImages] = useState<TProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const productData = await api.get<TProduct>(`/AD/products/${productId}`);
      setProduct(productData);
      // Используем изображения из продукта, они уже отфильтрованы на бэкенде
      setImages(productData.images || []);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('productId', productId.toString());
      formData.append('isMain', 'false');
      formData.append('sortOrder', images.length.toString());

      await api.postFormData('/AD/productImages', formData);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить это изображение?')) {
      return;
    }

    try {
      await api.delete(`/AD/productImages/${id}`);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления изображения');
    }
  };

  const handleSetMain = async (id: number) => {
    if (!confirm('Сделать это изображение главным?')) {
      return;
    }

    try {
      // Находим текущее главное изображение
      const currentMain = images.find((img) => img.isMain);

      // Удаляем старое главное и создаем новое с флагом isMain
      // Для этого нужно удалить текущее главное и пересоздать выбранное
      // Пока просто показываем сообщение, что нужно удалить и создать заново
      setError(
        'Для изменения главного изображения удалите текущее главное и загрузите новое с флагом "Главное"'
      );
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления');
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
          <h1 className="text-3xl font-bold text-gray-900">
            Изображения: {product?.title}
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="admin-card mb-6">
          <label className="admin-label">Загрузить новое изображение</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="admin-input"
          />
          {uploading && (
            <p className="text-sm text-gray-600 mt-2">Загрузка...</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="admin-card">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={image.imageUrl}
                  alt={`Изображение ${image.sortOrder}`}
                  className="w-full h-full object-cover"
                />
                {image.isMain && (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                    Главное
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {!image.isMain && (
                  <button
                    onClick={() => handleSetMain(image.id)}
                    className="admin-button-secondary flex-1 text-sm"
                  >
                    Сделать главным
                  </button>
                )}
                <button
                  onClick={() => handleDelete(image.id)}
                  className="admin-button-danger text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="admin-card text-center py-12">
            <p className="text-gray-600">Изображений пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
