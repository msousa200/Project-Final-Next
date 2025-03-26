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

const cleanHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getAbsoluteUrl = (path: string, baseUrl: string): string => {
  return path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
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
    
    const plainDescription = cleanHtml(product.description).substring(0, 160);
    
    const imageUrl = getAbsoluteUrl(product.image, baseUrl);
    
    const metadata: Metadata = {
      title: `${product.name} | ${brandName}`,
      description: plainDescription,
      keywords: [
        brandName, 
        product.name, 
        'relógios de luxo', 
        product.categoryId === 1 ? 'relógios masculinos' : 'relógios femininos',
        'comprar relógio',
        'relógio premium'
      ],
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        type: 'website',
        url: productUrl,
        title: `${product.name} | ${brandName}`,
        description: plainDescription,
        siteName: 'Perfect Hour',
        locale: 'pt_PT',
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: `Relógio ${product.name} da marca ${brandName}`,
            type: 'image/jpeg',
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | ${brandName}`,
        description: plainDescription,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };

    return metadata;

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