import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/data/products';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Nossos Relógios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}