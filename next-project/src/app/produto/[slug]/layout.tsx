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

  try {
    const products = await getProducts();
    const product = products.find(p => p.slug === params.slug);
    
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
    const productUrl = `${baseUrl}/produto/${product.slug}`;
    const brandName = brandNames[product.brandId] || "Marca Premium";
    const cleanDescription = product.description
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
    
    const imageUrl = product.image.startsWith('http') 
      ? product.image 
      : `${baseUrl}${product.image.startsWith('/') ? '' : '/'}${product.image}`;

    // Configuração correta para Twitter Card
    const twitterCard = {
      card: 'summary_large_image',
      title: `${product.name} | ${brandName}`,
      description: cleanDescription,
      images: {
        url: imageUrl,
        alt: `Relógio ${product.name} da marca ${brandName}`,
      },
      site: '@PerfectHour', // Adicione seu @handle do Twitter
      creator: '@PerfectHour', // Adicione seu @handle do Twitter
    };

    return {
      title: `${product.name} | ${brandName}`,
      description: cleanDescription,
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        ...previousMetadata.openGraph,
        title: `${product.name} | ${brandName}`,
        description: cleanDescription,
        url: productUrl,
        images: [{
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `Relógio ${product.name} da marca ${brandName}`,
        }],
      },
      twitter: twitterCard, // Usando a configuração correta
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