import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/produto/${product.id}`}>
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold">R$ {product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}