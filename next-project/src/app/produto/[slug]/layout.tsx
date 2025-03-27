/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProducts } from "@/data/products";
import type { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousMetadata = await parent;
  // Importante: await no params inteiro antes de acessar
  const resolvedParams = await params;

  try {
    const products = await getProducts();
    const slug = resolvedParams.slug; // Agora usando o params resolvido
    const product = products.find(p => p.slug === slug);
    
    if (!product) {
      return {
        title: 'Produto não encontrado',
        description: 'O produto que está à procura não foi disponibilizado ou já não existe.',
        robots: {
          index: false,
          follow: true,
        }
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://perfecthour.com';
    const productUrl = `${baseUrl}/produto/${slug}`;
    const brandName = brandNames[product.brandId] || "Marca Premium";
    
    const description = product.description
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
    
    const imageUrl = product.image.startsWith('http') 
      ? product.image 
      : `${baseUrl}${product.image.startsWith('/') ? '' : '/'}${product.image}`;

    return {
      title: `${product.name} | ${brandName}`,
      description,
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        ...previousMetadata.openGraph,
        title: `${product.name} | ${brandName}`,
        description,
        url: productUrl,
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Relógio ${product.name} da marca ${brandName}`,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | ${brandName}`,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Perfect Hour',
      description: 'Loja de relógios de luxo das melhores marcas internacionais',
    };
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}