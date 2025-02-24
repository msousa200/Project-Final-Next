import { getProducts } from '@/data/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold">R$ {product.price.toFixed(2)}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}