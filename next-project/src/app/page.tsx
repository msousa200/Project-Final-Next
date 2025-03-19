"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Carrossel from '@/components/carrossel/Carrossel';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import BrandFilter from '@/components/BrandFilter/BrandFilter';
import { getProducts } from '@/data/products';
import type { Product } from '@/data/products';

export default function Home() {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('newest');
  const router = useRouter();

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

  const handleBrandChange = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleProductClick = (slug: string) => {
    router.push(`/produto/${slug}`);
  };

  const sortProducts = (products: Product[]) => {
    switch (sortOption) {
      case 'lowest':
        return [...products].sort((a, b) => a.price - b.price);
      case 'highest':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(
    selectedBrands.length > 0
      ? products.filter((product) => selectedBrands.includes(product.brandId))
      : products
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="mt-[80px] md:mt-[100px]">
      <Carrossel />
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtro de Marcas */}
          <div className="w-full md:w-1/4">
            <BrandFilter
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
            />
          </div>

          {/* Grid de Produtos */}
          <div className="w-full md:w-3/4 md:pl-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-center w-full">
                Ver todos os produtos
              </h2>
              <div className="mt-4 md:mt-0">
                <select
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Novidades</option>
                  <option value="lowest">Preço mais baixo</option>
                  <option value="highest">Preço mais alto</option>
                </select>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">
                  Nenhum produto encontrado
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Por favor, ajuste os filtros de pesquisa.
                </p>
              </div>
            ) : (
              <ProductGrid 
                products={filteredAndSortedProducts}
                onProductClick={handleProductClick}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}