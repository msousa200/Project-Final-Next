"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { addToCart } from "@/features/cartSlice";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { getProducts, Product } from "@/data/products";
import { toast } from "react-hot-toast";

const brandNames: Record<number, string> = {
  1: "BOSS",
  2: "CALVIN KLEIN",
  3: "GANT",
  4: "GUESS",
  5: "HAMILTON",
  6: "HUGO",
  7: "LACOSTE",
  8: "NIXON",
  9: "TISSOT",
  10: "TOMMY HILFIGER"
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const slugParam = params?.slug as string;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);

        if (!slugParam) {
          toast.error("URL inválida");
          router.push("/");
          return;
        }

        const foundProduct = fetchedProducts.find((p) => p.slug === slugParam);

        if (!foundProduct) {
          toast.error("Produto não encontrado");
          router.push("/");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao carregar produto");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [slugParam, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
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

      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast.error("Erro ao adicionar ao carrinho");
    } finally {
      setAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Produto não encontrado
          </h2>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-black underline"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      if (a.brandId === product.brandId && a.categoryId === product.categoryId) return -1;
      if (b.brandId === product.brandId && b.categoryId === product.categoryId) return 1;
      if (a.categoryId === product.categoryId) return -1;
      if (b.categoryId === product.categoryId) return 1;
      if (a.brandId === product.brandId) return -1;
      if (b.brandId === product.brandId) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative lg:order-1">
            <div className="w-full h-96 lg:h-[500px] overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transform transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wide mb-1">
              {brandNames[product.brandId] || "MARCA"}
            </h3>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
              {formatPrice(product.price)}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full lg:w-auto bg-black text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addingToCart ? (
                <>
                  <FaSpinner className="animate-spin w-4 h-4" />
                  <span>Adicionando...</span>
                </>
              ) : (
                "Adicionar ao Carrinho"
              )}
            </button>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Disponibilidade:</span>
                <span className="font-medium text-green-600">Em Stock</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificações do Produto</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: product.description }} 
            className="prose max-w-none"
          />
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produto/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}