import { pathDev } from '../global.const';
import Link from 'next/link';

async function getProducts() {
  const res = await fetch(`${pathDev}/fe/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('failed to fetch products');
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <div>
        <h1>Список товары</h1>
        {products.length === 0 ? (
          <p>Нет продуктов</p>
        ) : (
          <ul>
            {products.map((product: any) => (
              <li key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <h2>{product.title}</h2>
                  {product.description}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
