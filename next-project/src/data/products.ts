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

// Interface para especificações do produto
interface ProductSpecs {
  visibleSpecs: {[key: string]: string}; // Specs visíveis inicialmente
  hiddenSpecs: {[key: string]: string};  // Specs expandíveis
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "");
}

// Função para gerar HTML da tabela a partir de dados estruturados
function generateSpecsTable(specs: ProductSpecs): string {
  return `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Especificações do Produto</h3>
      
      <div class="w-full md:w-1/2">
        <!-- Tabela Condensada (sempre visível) -->
        <div class="overflow-hidden border border-gray-200 rounded-lg mb-2">
          <table class="w-full divide-y divide-gray-200 text-xs">
            <tbody class="divide-y divide-gray-200">
              ${Object.entries(specs.visibleSpecs).map(([key, value]) => `
                <tr class="bg-white hover:bg-gray-50">
                  <td class="px-3 py-2 font-medium text-gray-700 w-2/5">${key}</td>
                  <td class="px-3 py-2 text-gray-600">${value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <!-- Tabela Estendida (inicialmente oculta) -->
        <div id="specs-extended" class="hidden overflow-hidden border border-gray-200 rounded-lg mt-2">
          <table class="w-full divide-y divide-gray-200 text-xs">
            <tbody class="divide-y divide-gray-200">
              ${Object.entries(specs.hiddenSpecs).map(([key, value]) => `
                <tr class="bg-white hover:bg-gray-50">
                  <td class="px-3 py-2 font-medium text-gray-700 w-2/5">${key}</td>
                  <td class="px-3 py-2 text-gray-600">${value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <button 
          onclick="document.getElementById('specs-extended').classList.toggle('hidden'); this.innerText = this.innerText === 'Ver mais especificações' ? 'Ver menos' : 'Ver mais especificações';" 
          class="text-xs text-gray-600 underline hover:text-black focus:outline-none mt-2"
        >
          Ver mais especificações
        </button>  
      </div>
    </div>
  `;
}

export async function getProducts(): Promise<Product[]> {
  // Definições das especificações de cada produto
  const product1Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Marshfield",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Tipo de Artigo": "Relógios",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Bracelete": "Aço",
      "Tamanho Caixa": "41",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR"
    }
  };

  const product2Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Marshfield",
      "Género": "Masculino",
      "Cor": "Azul"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "41",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não"
    }
  };

  const product3Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Easthill",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Tipo de Artigo": "Relógios",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Bracelete": "Aço",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR"
    }
  };

  const product4Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Park Hill",
      "Género": "Masculino",
      "Cor": "Castanho, Cinzento, Dourado rosa, Multi-color, Prateado"
    },
    hiddenSpecs: {
      "Tipo de Artigo": "Relógios",
      "Vidro Relógio": "Outro",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Bracelete": "Aço",
      "Tamanho Caixa": "43.5",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Estilo Relógio": "Casual, Clássico, Outro"
    }
  };

  const product5Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "EVERETT",
      "Género": "Feminino",
      "Cor": "Branco, Dourado, Prateado"
    },
    hiddenSpecs: {
      "Tipo de Artigo": "Relógios",
      "Vidro Relógio": "Outro",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Bracelete": "Aço",
      "Tamanho Caixa": "28",
      "Resistência Água": "Não",
      "Estilo Relógio": "Clássico, Outro"
    }
  };

  const product6Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Seneca",
      "Género": "Feminino",
      "Cor": "Branco"
    },
    hiddenSpecs: {
      "Tipo de Artigo": "Relógios",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Bracelete": "Malha Milanesa",
      "Tamanho Caixa": "22",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 BAR"
    }
  };

  const product7Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Park Hill Avenue",
      "Género": "Feminino",
      "Cor": "Branco, Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Outro",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "32",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Clássico, Outro"
    }
  };

  const product8Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Gant Time",
      "Coleção": "Park Hill Avenue",
      "Género": "Feminino",
      "Cor": "Branco, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Outro",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "32",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Clássico, Outro"
    }
  };

  const product9Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "BOSS Watches",
      "Coleção": "CANDOR AUTOMATIC",
      "Género": "Masculino",
      "Cor": "Prateado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Mecânico Automático",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "41",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product10Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "BOSS Watches",
      "Coleção": "BOSSMATIC",
      "Género": "Masculino",
      "Cor": "Azul, Branco, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Mecânico Automático",
      "Funcionalidades": "Data, Reserva de Marcha",
      "Caixa do Relógio": "Aço, Aluminio",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product11Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "BOSS Watches",
      "Coleção": "BOSSMATIC",
      "Género": "Masculino",
      "Cor": "Dourado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Mecânico Automático",
      "Funcionalidades": "Data, Reserva de Marcha",
      "Caixa do Relógio": "Aço, Aluminio, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product12Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "BOSS Watches",
      "Coleção": "TROPER AUTOMATIC",
      "Género": "Masculino",
      "Cor": "Prateado, Verde"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Mecânico Automático",
      "Funcionalidades": "Reserva de Marcha",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product13Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Iconic Mesh",
      "Género": "Masculino",
      "Cor": "Prateado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  const product14Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Distinguish",
      "Género": "Masculino",
      "Cor": "Prateado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product15Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Distinguish",
      "Género": "Masculino",
      "Cor": "Castanho, Dourado, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product16Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Exceptional",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "37",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product17Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Iconic",
      "Género": "Feminino",
      "Cor": "Dourado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "35",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Fashion"
    }
  };

  const product18Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Iconic",
      "Género": "Feminino",
      "Cor": "Dourado, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "35",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Fashion"
    }
  };

  const product19Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Calvin Klein Watches",
      "Coleção": "Delight",
      "Género": "Feminino",
      "Cor": "Prateado, Rosa"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "38",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product20Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "Frontier",
      "Género": "Masculino",
      "Cor": "Dourado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Silicone",
      "Tamanho Caixa": "48",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product21Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "Frontier",
      "Género": "Masculino",
      "Cor": "Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "48",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product22Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "New Royalty",
      "Género": "Masculino",
      "Cor": "Dourado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Silicone",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product23Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "New Royalty",
      "Género": "Masculino",
      "Cor": "Dourado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product24Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "MONOGRAM",
      "Género": "Feminino",
      "Cor": "Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "38",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product25Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "Ladies Core",
      "Género": "Feminino",
      "Cor": "Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product26Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Guess",
      "Coleção": "Ladies Core",
      "Género": "Feminino",
      "Cor": "Dourado, Verde"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "32",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual, Fashion"
    }
  };

  const product27Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Hamilton",
      "Coleção": "American Classics",
      "Género": "Masculino",
      "Cor": "Verde"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Mecânico Automático",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não"
    }
  };

  const product28Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Hamilton",
      "Coleção": "Khaki",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Mecânico Automático",
      "Tamanho Caixa": "38",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não"
    }
  };

  const product29Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Hamilton",
      "Coleção": "Khaki",
      "Género": "Masculino",
      "Cor": "Azul"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Mecânico Automático",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Pele",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 Bar",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  const product30Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Hamilton",
      "Coleção": "Khaki",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Mecânico Automático",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 Bar",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  // Dados dos produtos utilizando a função generateSpecsTable
  const products = [
    {
      id: 1,
      name: "Relógio Masculino Marshfield",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G192001_.png",
      description: generateSpecsTable(product1Specs),
      brandId: 3,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Relógio Masculino Marshfield Azul",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G192003_.png",
      description: generateSpecsTable(product2Specs),
      brandId: 3,
      categoryId: 1,
    },
    {
      id: 3,
      name: "Relógio Masculino Easthill Preto",
      price: 149.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G165001.png",
      description: generateSpecsTable(product3Specs),
      brandId: 3,
      categoryId: 1,
    },
    {
      id: 4,
      name: "Relógio Masculino Park Hill II",
      price: 189.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G121004.png",
      description: generateSpecsTable(product4Specs),
      brandId: 3,
      categoryId: 1,
    },
    {
      id: 5,
      name: "Gant Everett Mini 28 Branco Bicolor",
      price: 149.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G186002.png",
      description: generateSpecsTable(product5Specs),
      brandId: 3,
      categoryId: 2,
    },
    {
      id: 6,
      name: "Relógio Feminino Seneca",
      price: 129.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G193005_.png",
      description: generateSpecsTable(product6Specs),
      brandId: 3,
      categoryId: 2,
    },
    {
      id: 7,
      name: "Relógio Feminino Park Hill Avenue Branco e Dourado",
      price: 149.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/1/G127006.png",
      description: generateSpecsTable(product7Specs),
      brandId: 3,
      categoryId: 2,
    },
    {
      id: 8,
      name: "Relógio Feminino Park Hill Avenue Branco e Prateado",
      price: 129.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/G/1/G127010.png",
      description: generateSpecsTable(product8Specs),
      brandId: 3,
      categoryId: 2,
    },
    {
      id: 9,
      name: "Relógio Homem Automático CANDOR",
      price: 399.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1513916.png",
      description: generateSpecsTable(product9Specs),
      brandId: 1, // Correto: BOSS tem ID 1 no brands.ts
      categoryId: 1, // Categoria masculina
    },
    {
      id: 10,
      name: "Relógio Homem Automático BOSSMATIC",
      price: 399.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514212_Soldier_300dpi.png",
      description: generateSpecsTable(product10Specs),
      brandId: 1, // BOSS Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 11,
      name: "Relógio Homem Automático BOSSMATIC Gold",
      price: 449.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514180_Soldier_300dpi.png",
      description: generateSpecsTable(product11Specs),
      brandId: 1, // BOSS Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 12,
      name: "Relógio Homem TROPER AUTOMATIC",
      price: 349.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514200_Soldier_300dpi.png",
      description: generateSpecsTable(product12Specs),
      brandId: 1, // BOSS Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 13,
      name: "Relógio Homem Aço e Preto",
      price: 159.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300012_LRG_rgb_Web.png",
      description: generateSpecsTable(product13Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 14,
      name: "Relógio Homem Multifunções Preto e Prateado em Aço",
      price: 219.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25200459_LRG_rgb_Web.png",
      description: generateSpecsTable(product14Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 15,
      name: "Relógio Homem Multifunções Castanho e Dourado em Aço",
      price: 239.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25200442_LRG_rgb_Web.png",
      description: generateSpecsTable(product15Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 16,
      name: "Relógio Homem Preto com Malha Milanesa em Aço",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300002_LRG_rgb_Web.png",
      description: generateSpecsTable(product16Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 1, // Categoria masculina
    },
    {
      id: 17,
      name: "Relógio Senhora Dourado e Preto",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300016_LRG_rgb_Web.png",
      description: generateSpecsTable(product17Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 2, // Categoria feminina
    },
    {
      id: 18,
      name: "Relógio Senhora Aço e Dourado",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300014_LRG_rgb_Web.png",
      description: generateSpecsTable(product18Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 2, // Categoria feminina
    },
    {
      id: 19,
      name: "Relógio Senhora Rosa e Prateado em Aço",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25100047.png",
      description: generateSpecsTable(product19Specs),
      brandId: 2, // Calvin Klein Watches
      categoryId: 2, // Categoria feminina
    },
    {
      id: 20,
      name: "Relógio Masculino Frontier Preto com Brilhantes",
      price: 239.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/W/1/W1132G1_1.png",
      description: generateSpecsTable(product20Specs),
      brandId: 4, // Nova marca: Guess
      categoryId: 1, // Categoria masculina
    },
    {
      id: 21,
      name: "Relógio Masculino Frontier Dourado com Brilhantes",
      price: 349.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/W/0/W0799G2_1.png",
      description: generateSpecsTable(product21Specs),
      brandId: 4, // Guess
      categoryId: 1, // Categoria masculina
    },
    {
      id: 22,
      name: "RELÓGIO DOURADO PRETO 44MM",
      price: 129.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0726G2_1.png",
      description: generateSpecsTable(product22Specs),
      brandId: 4, // Guess
      categoryId: 1, // Categoria masculina
    },
    {
      id: 23,
      name: "Relógio Masculino Reputation Preto e Dourado",
      price: 179.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0710G2_1.png",
      description: generateSpecsTable(product23Specs),
      brandId: 4, // Guess
      categoryId: 1, // Categoria masculina
    },
    {
      id: 24,
      name: "Relógio Feminino Lady Idol Dourado",
      price: 189.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0605L2_1.png",
      description: generateSpecsTable(product24Specs),
      brandId: 4, // Guess
      categoryId: 2, // Categoria feminina
    },
    {
      id: 25,
      name: "Relógio Feminino G Check Dourado",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0292L2_1.png",
      description: generateSpecsTable(product25Specs),
      brandId: 4, // Guess
      categoryId: 2, // Categoria feminina
    },
    {
      id: 26,
      name: "Relógio Feminino Fawn Verde com Brilhantes",
      price: 189.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0686L2_1.png",
      description: generateSpecsTable(product26Specs),
      brandId: 4, // Guess
      categoryId: 2, // Categoria feminina
    },
    {
      id: 27,
      name: "Jazzmaster Open Heart",
      price: 1225.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/3/H32675160_Web.png",
      description: generateSpecsTable(product27Specs),
      brandId: 5, // Nova marca: Hamilton
      categoryId: 1, // Categoria masculina
    },
    {
      id: 28,
      name: "Khaki Field Murph 38mm",
      price: 995.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/7/H70405730_WEB.png",
      description: generateSpecsTable(product28Specs),
      brandId: 5, // Hamilton
      categoryId: 1, // Categoria masculina
    },
    {
      id: 29,
      name: "Khaki Field Titanium Auto",
      price: 1145.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/7/H70545540-0606.png",
      description: generateSpecsTable(product29Specs),
      brandId: 5, // Hamilton
      categoryId: 1, // Categoria masculina
    },
    {
      id: 30,
      name: "Khaki Aviation Converter Auto 42mm",
      price: 1295.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/h/7/h76615130.png",
      description: generateSpecsTable(product30Specs),
      brandId: 5, // Hamilton
      categoryId: 1, // Categoria masculina
    },
  ];

  return products.map((product) => ({
    ...product,
    slug: slugify(product.name), 
  }));
}