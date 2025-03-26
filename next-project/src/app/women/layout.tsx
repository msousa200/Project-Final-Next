import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Relógios Femininos',
  description: 'Descubra a nossa coleção exclusiva de relógios femininos de luxo. Elegância e sofisticação em relógios BOSS, Calvin Klein, Gant e outras marcas premium.',
  keywords: ['relógios femininos', 'relógios de luxo para mulheres', 'BOSS', 'Calvin Klein', 'Gant'],
  openGraph: {
    title: 'Relógios Femininos | Perfect Hour',
    description: 'Descubra a nossa coleção exclusiva de relógios femininos de luxo.',
    images: ['/og-women-watches.jpg'],
  },
};

export default function WomenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}