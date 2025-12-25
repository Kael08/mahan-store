import { pathDev } from '../global.const'

async function getProducts() {
    const res = await fetch(`${pathDev}/fe/products`, {
        cache: 'no-store'
    });

    if(!res.ok) {
        throw new Error('failed to fetch products');
    }

    return res.json();
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <h1>Список товары</h1>
            {products.length=== 0 ? (
                <p>Нет продуктов</p>
            ): (
                <ul>
                    {products.map((product:any)=>(
                        <li key={product.id}>
                            <h2>{product.title}</h2>
                            {product.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}