/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Product, getProducts } from '@/data/products';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import BrandFilter from '@/components/BrandFilter/BrandFilter';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Erro ao acessar localStorage:', error);
    return defaultValue;
  }
};

const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('newest');
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedBrands = getLocalStorage('womenSelectedBrands', []);
      const savedSort = getLocalStorage('womenSortOption', 'newest');
      
      setSelectedBrands(savedBrands);
      setSortOption(savedSort);
    }
  }, [isMounted]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const womenProducts = allProducts.filter(product => product.categoryId === 2);
        setProducts(womenProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        toast.error('Erro ao carregar produtos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isMounted) {
      setLocalStorage('womenSelectedBrands', selectedBrands);
    }
  }, [selectedBrands, isMounted]);

  useEffect(() => {
    if (isMounted) {
      setLocalStorage('womenSortOption', sortOption);
    }
  }, [sortOption, isMounted]);

  const handleBrandChange = useCallback((brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedBrands([]);
    setSortOption('newest');
  }, []);

  const handleProductClick = useCallback((slug: string) => {
    router.push(`/produto/${slug}`);
  }, [router]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  }, []);

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
      <div className="min-h-screen flex items-center justify-center">
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
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="w-full md:w-3/4">
            {/* Header com título e select */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left mb-4 md:mb-0">
                Relógios Femininos
              </h1>
              <div>
                <select
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm 
                    font-medium text-gray-700 cursor-pointer hover:border-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-black 
                    focus:border-transparent transition-all shadow-sm"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">Novidades</option>
                  <option value="lowest">Preço mais baixo</option>
                  <option value="highest">Preço mais alto</option>
                </select>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">
                  Nenhum produto encontrado
                </h3>
                <p className="mt-2 text-sm text-gray-500">
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
      </div>
    </main>
  );
}