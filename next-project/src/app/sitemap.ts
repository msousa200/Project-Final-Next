import { MetadataRoute } from 'next';
import { getProducts } from '@/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://perfecthour.com'; // URL atualizada
  
  // Buscar todos os produtos para o sitemap
  const products = await getProducts();
  
  // URLs de produtos
  const productUrls = products.map(product => ({
    url: `${baseUrl}/produto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // URLs fixas
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/men`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/women`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ];
}