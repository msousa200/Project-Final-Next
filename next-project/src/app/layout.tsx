import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import Providers from '@/components/Providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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