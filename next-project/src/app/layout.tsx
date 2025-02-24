import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import Carrossel from '../components/carrossel/Carrossel';
import styles from './styles.module.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html>
    <body>
      <div className= {styles.container}>
        <Header />
        <Carrossel />
        <Footer/>
      </div>
    </body>
  </html>
  );
}

