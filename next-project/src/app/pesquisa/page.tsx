"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import BrandFilter from '@/components/BrandFilter/BrandFilter';
import { Product, getProducts } from '@/data/products';

export default function PesquisaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('newest');
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        const allProducts = await getProducts();
        
        const searchFilteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setProducts(searchFilteredProducts);
        setFilteredProducts(searchFilteredProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
      setFilteredProducts([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const brandFiltered = selectedBrands.length > 0
      ? products.filter((product) => selectedBrands.includes(product.brandId))
      : products;
    
    setFilteredProducts(sortProducts(brandFiltered));
  }, [selectedBrands, sortOption, products]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[120px]">
        <FaSpinner className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  return (
    <main className="mt-[120px]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtro de Marcas */}
          <div className="w-full md:w-1/4">
            <BrandFilter
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="w-full md:w-3/4">
            {/* Header com título e select */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left mb-4 md:mb-0">
                {products.length > 0 
                  ? `Resultados para: "${searchQuery}" (${products.length})`
                  : `Nenhum resultado encontrado para: "${searchQuery}"`}
              </h1>
              
              {products.length > 0 && (
                <div>
                  <select
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm 
                      font-medium text-gray-700 cursor-pointer hover:border-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-black 
                      focus:border-transparent transition-all shadow-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="newest">Novidades</option>
                    <option value="lowest">Preço mais baixo</option>
                    <option value="highest">Preço mais alto</option>
                  </select>
                </div>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">
                  Nenhum produto encontrado
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {products.length > 0 
                    ? "Por favor, ajuste os filtros de pesquisa."
                    : "Tente buscar por outro termo."}
                </p>
                <button 
                  onClick={() => router.push('/')}
                  className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Voltar à página inicial
                </button>
              </div>
            ) : (
              <ProductGrid 
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}