export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 1,
      name: 'Relógio Balmain Classic',
      price: 1200.0,
      image: '/balmain-classic-r-b4101-31-24-13697661.jpg',
      description: 'Relógio de luxo com design clássico.',
    },
    {
      id: 2,
      name: 'Relógio Esportivo',
      price: 800.0,
      image: '/relogio-esportivo.jpg',
      description: 'Relógio resistente para atividades esportivas.',
    },
    {
      id: 3,
      name: 'Relógio Minimalista',
      price: 600.0,
      image: '/relogio-minimalista.jpg',
      description: 'Design simples e elegante.',
    },
  ];
}