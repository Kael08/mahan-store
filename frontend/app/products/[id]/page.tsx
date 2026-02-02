import { pathDev } from '../../global.const';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TProduct } from '../../types/product.types';
import { routes } from '@/src/lib/routes';
import type { Metadata } from 'next';
import BrandLogo from '../../components/BrandLogo';
import AvatarImage from '../../components/AvatarImage';
import ImageGallery from '../../components/ImageGallery';

async function getProduct(id: string): Promise<TProduct | null> {
  try {
    const res = await fetch(`${pathDev}/fe/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Не удалось загрузить товар');
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Товар не найден - Arise Fashion',
    };
  }

  return {
    title: `${product.title} - Arise Fashion`,
    description:
      product.description || `Купить ${product.title} в Arise Fashion`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const inStockVariants =
    product.variants?.filter((v) => v.stockStatus === 'in_stock') || [];
  const outOfStockVariants =
    product.variants?.filter((v) => v.stockStatus === 'out_of_stock') || [];

  // Группировка вариантов по цвету
  const variantsByColor =
    product.variants?.reduce(
      (acc, variant) => {
        if (!acc[variant.color]) {
          acc[variant.color] = [];
        }
        acc[variant.color].push(variant);
        return acc;
      },
      {} as Record<string, typeof product.variants>
    ) || {};

  return (
    <main>
      <div className="product-detail-container">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link
            href={routes.home}
            className="hover:text-indigo-600 transition-colors"
          >
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={routes.home}
            className="hover:text-indigo-600 transition-colors"
          >
            Товары
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Галерея изображений */}
          <div>
            <ImageGallery
              images={product.images || []}
              productTitle={product.title}
            />
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Бренд и категория */}
            <div className="flex items-center gap-3">
              <BrandLogo
                src={product.brand?.logoUrl}
                alt={product.brand?.name || 'Бренд'}
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="text-sm text-gray-500">
                  {product.brand?.name || 'Без бренда'} •{' '}
                  {product.category?.name}
                </div>
              </div>
            </div>

            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Цена */}
            <div className="text-3xl font-bold text-indigo-700">
              {product.priceMin && product.priceMax
                ? product.priceMin === product.priceMax
                  ? `${Number(product.priceMin).toLocaleString('ru-RU')} ₽`
                  : `от ${Number(product.priceMin).toLocaleString('ru-RU')} до ${Number(product.priceMax).toLocaleString('ru-RU')} ₽`
                : 'Цена по запросу'}
            </div>

            {/* Статус */}
            <div className="flex items-center gap-4">
              {inStockVariants.length > 0 ? (
                <span className="text-green-600 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>В
                  наличии ({inStockVariants.length} вариантов)
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Нет в наличии
                </span>
              )}
              {!product.isActive && (
                <span className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded">
                  Товар неактивен
                </span>
              )}
            </div>

            {/* Описание */}
            {product.description && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Описание
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Варианты */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Доступные варианты
                </h3>
                <div className="space-y-4">
                  {Object.entries(variantsByColor).map(([color, variants]) => (
                    <div
                      key={color}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="font-medium text-gray-900 mb-3">
                        Цвет: <span className="capitalize">{color}</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {variants.map((variant) => (
                          <div
                            key={variant.id}
                            className={`p-3 border rounded-lg text-center ${
                              variant.stockStatus === 'in_stock'
                                ? 'border-green-500 bg-white'
                                : 'border-gray-300 bg-gray-100 opacity-60'
                            }`}
                          >
                            <div className="font-medium text-sm mb-1">
                              Размер {variant.size}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {Number(variant.price).toLocaleString('ru-RU')} ₽
                            </div>
                            <div
                              className={`text-xs ${
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
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Продавец */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-3 mb-3">
                {product.seller?.avatarUrl && (
                  <AvatarImage
                    src={product.seller.avatarUrl}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-medium text-gray-900">
                    {product.seller?.name}
                  </div>
                  {product.seller?.description && (
                    <div className="text-sm text-gray-600">
                      {product.seller.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ссылки */}
            {product.links && product.links.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Связаться с продавцом
                </h3>
                {product.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {link.label || link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
