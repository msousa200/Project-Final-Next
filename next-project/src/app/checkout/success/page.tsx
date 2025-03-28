"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/features/cartSlice';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import RequireAuth from '@/components/auth/RequireAuth';

export default function SuccessPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto p-4 md:p-6 mt-[120px] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Compra Concluída com Sucesso!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Obrigado pela sua compra. Você receberá um e-mail de confirmação em breve.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              Número de Pedido: <span className="font-semibold">#{Math.floor(Math.random() * 1000000)}</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/orders" 
              className="block w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Ver os Meus Pedidos
            </Link>
            
            <Link 
              href="/" 
              className="block w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continuar a comprar
            </Link>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}