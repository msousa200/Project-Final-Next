import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Perfect Hour | Relógios de Luxo',
    template: '%s | Perfect Hour'
  },
  description: 'Descubra nossa coleção exclusiva de relógios de luxo das melhores marcas...',
  keywords: ['relógios de luxo', 'watches', 'Boss', 'Calvin Klein', 'Gant', 'relógios masculinos', 'relógios femininos'],
  authors: [{ name: 'Perfect Hour' }],
  creator: 'Perfect Hour',
  publisher: 'Perfect Hour',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://perfecthour.com'),
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Perfect Hour',
    title: 'Perfect Hour | Relógios de Luxo',
    description: 'Descubra nossa coleção exclusiva de relógios de luxo das melhores marcas.',
    images: [
      {
        url: '/logotipo.jpg', 
        width: 1200,
        height: 630, 
        alt: 'Perfect Hour',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perfect Hour | Relógios de Luxo',
    description: 'Descubra nossa coleção exclusiva de relógios de luxo das melhores marcas.',
    images: ['/logotipo.jpg'], 
  },
  icons: {
    icon: [
      { url: '/logotipo.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logotipo.jpg',
    apple: [
      { url: '/logotipo.jpg', sizes: '180x180' }
    ],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID || '',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow px-4 md:px-8 lg:px-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}