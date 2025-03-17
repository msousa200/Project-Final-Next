"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, ''); 
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (slug: string) => void; 
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleAddToCart = async (product: Product) => {
    setLoadingProductId(product.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(
        addToCart({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      );

      toast.success('Produto adicionado ao carrinho!');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho');
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg mx-auto w-full max-w-[250px] relative group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link
              href={`/produto/${slugify(product.name)}`} 
              className="block"
            >
              <div className="w-full h-[200px] overflow-hidden rounded-lg relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link
                href={`/produto/${slugify(product.name)}`} 
                onClick={() => onProductClick(slugify(product.name))}
              >
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-black transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 bg-black/75 px-4 py-3 
              flex justify-center items-center opacity-0 transition-all duration-300 
              group-hover:opacity-100 translate-y-full group-hover:translate-y-0`}
            >
              <button
                onClick={() => handleAddToCart(product)}
                disabled={loadingProductId === product.id}
                className="w-full bg-[#2c2c2c] text-white px-6 py-2 rounded-md text-sm uppercase tracking-wider 
                  hover:bg-black hover:-translate-y-0.5 hover:shadow-md transition-all 
                  flex items-center justify-center gap-2 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingProductId === product.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin w-4 h-4" />
                    <span>Adicionando...</span>
                  </div>
                ) : (
                  'Adicionar ao Carrinho'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;