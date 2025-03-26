import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Relógios Masculinos',
  description: 'Descubra a nossa coleção exclusiva de relógios masculinos de luxo. Elegância e sofisticação em relógios BOSS, Calvin Klein, Gant e outras marcas premium.',
  keywords: ['relógios masculinos', 'relógios de luxo para homens', 'BOSS', 'Calvin Klein', 'Gant'],
  openGraph: {
    title: 'Relógios Masculinos | Perfect Hour',
    description: 'Descubra a nossa coleção exclusiva de relógios masculinos de luxo.',
    images: ['/og-men-watches.jpg'],
  },
};

export default function MenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}