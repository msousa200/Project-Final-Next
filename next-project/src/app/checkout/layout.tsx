import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Finalizar a sua compra de relógios de luxo',
  robots: {
    index: false,
    follow: false,
  }
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}