"use client";
import { useState, useEffect } from 'react';
import { Product, getProducts } from '@/data/products';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './page.module.css';

export default function ShopAllPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-16 mt-[100px]">
      <h1 className="text-3xl font-bold text-center mb-8">Ver todos os produtos</h1>
      {products.length === 0 ? (
        <div className="text-center">
          <p>Nenhum produto encontrado.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}