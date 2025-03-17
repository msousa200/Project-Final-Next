export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  brandId: number;
  categoryId: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "");
}

export async function getProducts(): Promise<Product[]> {
  const products = [
    {
      id: 1,
      name: "Relógio Masculino Marshfield",
      price: 179.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G192001_.png",
      description:
        "O relógio Gant Time, da coleção Marshfield, é um modelo masculino elegante e sofisticado...",
      brandId: 10,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Relógio Masculino Marshfield Azul",
      price: 179.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G192003_.png",
      description:
        "O relógio Gant Time da coleção Marshfield é a escolha perfeita para homens que procuram estilo e funcionalidade...",
      brandId: 10,
      categoryId: 1,
    },
    {
      id: 3,
      name: "Relógio Masculino Easthill Preto",
      price: 149.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G165001.png",
      description:
        "O relógio Gant Time da coleção EastHill é uma escolha elegante e versátil para o homem moderno...",
      brandId: 10,
      categoryId: 1,
    },
    {
      id: 4,
      name: "Relógio Masculino Park Hill II",
      price: 189.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G121004.png",
      description:
        "O relógio Gant Time da coleção Park Hill é a escolha perfeita para o homem que aprecia um estilo sofisticado e moderno...",
      brandId: 10,
      categoryId: 1,
    },
    {
      id: 5,
      name: "Gant Everett Mini 28 Branco Bicolor",
      price: 149.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G186002.png",
      description:
        "O relógio Gant Time da coleção Everett é a escolha ideal para mulheres que buscam um design clássico e elegante...",
      brandId: 10,
      categoryId: 2,
    },
    {
      id: 6,
      name: "Relógio Feminino Seneca",
      price: 129.0,
      image:
        "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G193005_.png",
      description:
        "O Gant Time Seneca apresenta um design clássico e versátil...",
      brandId: 10,
      categoryId: 2,
    },
  ];

  return products.map((product) => ({
    ...product,
    slug: slugify(product.name), 
  }));
}