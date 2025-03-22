"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { removeFromCart, updateQuantity, clearCart } from '@/features/cartSlice';
import Image from 'next/image';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [isReady, setIsReady] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 mt-[80px] flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error('A quantidade mínima é 1');
      return;
    }

    if (newQuantity > 10) {
      toast.error('A quantidade máxima é 10');
      return;
    }

    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    toast.success('Item removido do carrinho');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Carrinho foi limpo');
  };

  const handleCheckout = () => {
    if (!session) {
      toast.error("Por favor, faça login para continuar");
      router.push('/login?callbackUrl=/checkout');
      return;
    }
    
    router.push('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 mt-[80px]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Carrinho de Compras</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">O seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 font-medium">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                        aria-label="Diminuir quantidade"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus className={`w-4 h-4 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                        aria-label="Aumentar quantidade"
                        disabled={item.quantity >= 10}
                      >
                        <FaPlus className={`w-4 h-4 ${item.quantity >= 10 ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remover item"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-gray-800">{formatPrice(total)}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleClearCart}
                className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                Limpar Carrinho
              </button>

              <button
                onClick={handleCheckout}
                className="flex-1 px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;