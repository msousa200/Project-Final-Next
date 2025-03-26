import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/profile/', '/orders/'],
    },
    sitemap: 'https://perfecthour.com/sitemap.xml',
  };
}