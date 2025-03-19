"use client";

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaCreditCard, FaPaypal, FaCheckCircle, FaLock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { RootState } from '@/app/store';
import RequireAuth from '@/components/auth/RequireAuth';

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Portugal'
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (cartItems.length === 0) {
    router.push('/carrinho');
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.firstName || !shippingData.lastName || !shippingData.street || 
        !shippingData.city || !shippingData.postalCode || !shippingData.phone) {
      toast.error("Por favor preencha todos os campos");
      return;
    }
    
    setStep('payment');
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (paymentMethod === 'paypal') {
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems,
            shippingDetails: shippingData,
            paymentMethod: 'paypal',
            total: total
          })
        });
        
        if (!orderResponse.ok) {
          throw new Error('Erro ao criar pedido');
        }
        
        const orderData = await orderResponse.json();
        
        toast.success('Redirecionando para o PayPal...');
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        router.push('/checkout/success');
      } else {
        if (!cardData.cardNumber || !cardData.expiry || !cardData.cvc) {
          throw new Error('Por favor, preencha todos os dados do cartão');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems,
            shippingDetails: shippingData,
            paymentMethod: 'credit',
            total: total
          })
        });
        
        if (!orderResponse.ok) {
          throw new Error('Erro ao criar pedido');
        }
        
        router.push('/checkout/success');
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error(typeof error === 'string' ? error : "Erro ao processar o pagamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto p-4 md:p-6 mt-[120px]">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Finalizar Compra</h1>
        
        {step === 'shipping' ? (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Endereço de Envio</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={shippingData.firstName}
                  onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                <input
                  type="text"
                  value={shippingData.lastName}
                  onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                <input
                  type="text"
                  value={shippingData.street}
                  onChange={(e) => setShippingData({...shippingData, street: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  value={shippingData.city}
                  onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input
                  type="text"
                  value={shippingData.postalCode}
                  onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={shippingData.phone}
                  onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                <select
                  value={shippingData.country}
                  onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                >
                  <option value="Portugal">Portugal</option>
                  <option value="Espanha">Espanha</option>
                  <option value="França">França</option>
                  <option value="Alemanha">Alemanha</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Continuar para Pagamento
            </button>
          </form>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Método de Pagamento</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                  className="h-4 w-4"
                />
                <label htmlFor="credit" className="flex items-center">
                  <FaCreditCard className="mr-2" /> Cartão de Crédito
                </label>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="h-4 w-4"
                />
                <label htmlFor="paypal" className="flex items-center">
                  <FaPaypal className="mr-2" /> PayPal
                </label>
              </div>
            </div>
            
            {paymentMethod === 'paypal' ? (
              <div className="space-y-4 bg-gray-50 p-6 rounded-md border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaPaypal className="text-[#0070ba] text-2xl mr-2" />
                    <span className="font-medium">PayPal</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Ao clicar em "Confirmar Encomenda", você será redirecionado para o PayPal para concluir sua compra com segurança.
                  </p>
                  
                  <div className="flex items-start mt-3">
                    <div className="bg-[#f0f7ff] p-3 rounded-md flex-grow">
                      <p className="text-sm font-medium mb-2">Com PayPal você pode:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Pagar com seu saldo PayPal ou cartão vinculado
                        </li>
                        <li className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Finalizar a compra sem compartilhar seus dados financeiros
                        </li>
                        <li className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Beneficiar-se da Proteção ao Comprador do PayPal
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center">
                  <FaLock className="text-gray-400 mr-1" />
                  Seus dados estão protegidos com criptografia de ponta a ponta
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Validade</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input
                      type="text"
                      value={cardData.cvc}
                      onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-black"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Voltar
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Processando...' : 'Confirmar Encomenda'}
              </button>
            </div>
          </form>
        )}
      </div>
    </RequireAuth>
  );
}