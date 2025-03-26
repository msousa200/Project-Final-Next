"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaBox, FaClock, FaCheck, FaTruck, FaInfoCircle, FaAngleRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import RequireAuth from '@/components/auth/RequireAuth';
import Image from 'next/image';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  country: string;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar pedidos');
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        toast.error('Não foi possível carregar seus pedidos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-purple-500" />;
      case 'delivered':
        return <FaCheck className="text-green-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const getStatusName = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <RequireAuth>
      <div className="max-w-6xl mx-auto p-4 md:p-6 mt-[120px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Meus Pedidos</h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Você ainda não tem pedidos</h2>
            <p className="text-gray-600 mb-6">Explore nossa loja e faça seu primeiro pedido!</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Ir para a Loja
            </button>
          </div>
        ) : selectedOrder ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cabeçalho de detalhes do pedido */}
            <div className="p-4 md:p-6 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Detalhes do Pedido #{selectedOrder.id.slice(-6)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-sm text-gray-600 hover:text-black underline"
                >
                  Voltar para todos os pedidos
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-6 md:space-y-8">
              {/* Grid responsivo de informações */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base md:text-lg font-medium mb-2 text-gray-800">Informações do Pedido</h3>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-2 font-medium">{getStatusName(selectedOrder.status)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Data: {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Método de Pagamento: {selectedOrder.paymentMethod === 'paypal' ? 'PayPal' : 'Cartão de Crédito'}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Total: {formatPrice(selectedOrder.total)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-medium mb-2 text-gray-800">Endereço de Entrega</h3>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-md">
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedOrder.shippingDetails.firstName} {selectedOrder.shippingDetails.lastName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">{selectedOrder.shippingDetails.street}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedOrder.shippingDetails.postalCode} - {selectedOrder.shippingDetails.city}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">{selectedOrder.shippingDetails.country}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.shippingDetails.phone}</p>
                  </div>
                </div>
              </div>

              {/* Tabela de produtos responsiva */}
              <div>
                <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4 text-gray-800">Produtos</h3>
                
                {/* Versão para desktop da tabela */}
                <div className="hidden md:block border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produto
                        </th>
                        <th className="px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço
                        </th>
                        <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {formatPrice(item.price)}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 md:px-6 py-4 text-right text-sm font-medium">Total</td>
                        <td className="px-4 md:px-6 py-4 text-right text-sm font-bold text-gray-900">
                          {formatPrice(selectedOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                {/* Versão para mobile - cards em vez de tabela */}
                <div className="md:hidden space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{item.name}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-gray-600">Quantidade:</p>
                        <p className="text-right">{item.quantity}</p>
                        <p className="text-gray-600">Preço unitário:</p>
                        <p className="text-right">{formatPrice(item.price)}</p>
                        <p className="text-gray-600 font-medium">Subtotal:</p>
                        <p className="text-right font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
                    <p className="font-medium text-gray-900">Total</p>
                    <p className="font-bold text-gray-900">{formatPrice(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Versão desktop da tabela de pedidos */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nº do Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id.slice(-6)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-1 text-sm text-gray-900">{getStatusName(order.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-black hover:text-gray-700"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Versão mobile - cards para lista de pedidos */}
            <div className="md:hidden divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">#{order.id.slice(-6)}</p>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    <p className="font-medium">{formatPrice(order.total)}</p>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm">
                    <span className="mr-2">{getStatusIcon(order.status)}</span>
                    <span className="text-gray-700">{getStatusName(order.status)}</span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-3 w-full flex items-center justify-center py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Ver Detalhes <FaAngleRight className="ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}