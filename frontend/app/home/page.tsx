import { pathDev } from '../global.const';
import { TProduct } from '../types/product.types';
import ProductCard from '../components/ProductCard';
import ProductsPageClient from '../components/ProductsPageClient';

async function getProducts(): Promise<TProduct[]> {
  const res = await fetch(`${pathDev}/fe/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return <ProductsPageClient initialProducts={products} />;
}
