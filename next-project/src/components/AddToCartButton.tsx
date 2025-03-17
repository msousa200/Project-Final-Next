"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: string; 
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(
        addToCart({
          id: product.id,
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
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-[#2c2c2c] text-white px-6 py-2 rounded-md text-sm uppercase tracking-wider hover:bg-black hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:transform-none"
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin w-4 h-4" />
          <span>Adicionando...</span>
        </>
      ) : (
        'Adicionar ao Carrinho'
      )}
    </button>
  );
}