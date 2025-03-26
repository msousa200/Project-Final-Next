import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesquisa de Produtos',
  description: 'Encontre o relógio perfeito na nossa coleção de relógios de luxo',
  robots: {
    index: false,
    follow: true,
  }
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}