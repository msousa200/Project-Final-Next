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

interface ProductSpecs {
  visibleSpecs: {[key: string]: string}; 
  hiddenSpecs: {[key: string]: string}; 
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "");
}

function generateSpecsTable(specs: ProductSpecs): string {
  // Função para filtrar campos indesejados
  const filterUnwantedSpecs = (specsObj: {[key: string]: string}) => {
    const unwantedFields = ["Is preowned", "Online exclusive", "Tipo de Artigo", "Kids", "Edição Especial"];
    const filteredSpecs: {[key: string]: string} = {};
    
    Object.entries(specsObj).forEach(([key, value]) => {
      if (!unwantedFields.includes(key)) {
        filteredSpecs[key] = value;
      }
    });
    
    return filteredSpecs;
  };

  // Aplicar o filtro aos specs visíveis e ocultos
  const filteredVisibleSpecs = filterUnwantedSpecs(specs.visibleSpecs);
  const filteredHiddenSpecs = filterUnwantedSpecs(specs.hiddenSpecs);

  return `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Especificações do Produto</h3>
      
      <div class="w-full md:w-1/2">
        <!-- Tabela Condensada (sempre visível) -->
        <div class="overflow-hidden border border-gray-200 rounded-lg mb-2">
          <table class="w-full divide-y divide-gray-200 text-xs">
            <tbody class="divide-y divide-gray-200">
              ${Object.entries(filteredVisibleSpecs).map(([key, value]) => `
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
              ${Object.entries(filteredHiddenSpecs).map(([key, value]) => `
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

  const product31Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Hamilton",
      "Coleção": "Khaki",
      "Género": "Unissexo",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Tamanho Caixa": "0",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product32Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "HUGO Watches",
      "Coleção": "FIRST",
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
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "43",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product33Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "HUGO Watches",
      "Coleção": "FIRST",
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
      "Funcionalidades": "Calendário",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "43",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product34Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "HUGO Watches",
      "Coleção": "STREETDIVER",
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
      "Caixa do Relógio": "Aço",
      "Bracelete": "Pele",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não"
    }
  };

  const product35Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "HUGO Watches",
      "Coleção": "#SMASH MULTI",
      "Género": "Masculino",
      "Cor": "Prateado, Verde"
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
      "Tamanho Caixa": "43",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product36Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "LC33",
      "Género": "Masculino",
      "Cor": "Branco"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Digital",
      "Caixa do Relógio": "Aço, TR90",
      "Bracelete": "Silicone",
      "Tamanho Caixa": "45",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Desportivo"
    }
  };

  const product37Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "LISBON",
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
      "Bracelete": "Pele",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product38Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "L.12.12",
      "Género": "Unissexo",
      "Cor": "Azul"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Caixa do Relógio": "Aluminio",
      "Bracelete": "Silicone",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Desportivo"
    }
  };

  const product39Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "BOSTON",
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
      "Funcionalidades": "Cronógrafo",
      "Caixa do Relógio": "Aço, Aluminio, Ionic Plated",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não"
    }
  };

  const product40Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "CANNES",
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
      "Bracelete": "Pele",
      "Tamanho Caixa": "34",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  const product41Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "RIGA",
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
      "Caixa do Relógio": "Aço, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated",
      "Tamanho Caixa": "34",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não"
    }
  };

  const product42Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Lacoste Watches",
      "Coleção": "BIRDIE",
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
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Pele",
      "Tamanho Caixa": "36",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não"
    }
  };

  const product43Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "SENTRY",
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
      "Funcionalidades": "Calendário, Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product44Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "DRIFTER",
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
      "Bracelete": "Aço",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "100M",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  const product45Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "SENTRY",
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
      "Funcionalidades": "Calendário, Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product46Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "DRIFTER",
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
      "Bracelete": "Aço",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "100M",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  const product47Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "TIME TELLER",
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
      "Caixa do Relógio": "Resina",
      "Bracelete": "Resina",
      "Tamanho Caixa": "40",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product48Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "Siren",
      "Género": "Feminino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Alarme, Cronógrafo, Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "36",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product49Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Nixon",
      "Coleção": "Siren",
      "Género": "Feminino",
      "Cor": "Rosa Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Alarme, Cronógrafo, Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "36",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product50Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Masculino",
      "Cor": "Verde"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Tamanho Caixa": "40",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não"
    }
  };

  const product51Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Masculino",
      "Cor": "Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Pele",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product52Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Sport",
      "Género": "Masculino",
      "Cor": "Azul"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Casual"
    }
  };

  const product53Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Masculino",
      "Cor": "Branco"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  const product54Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Feminino",
      "Cor": "Dourado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Tamanho Caixa": "34",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 BAR",
      "Edição Especial": "Não"
    }
  };

  const product55Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Feminino",
      "Cor": "Dourado, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Tamanho Caixa": "34",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "10 BAR",
      "Edição Especial": "Não"
    }
  };

  const product56Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tissot",
      "Coleção": "Classic",
      "Género": "Feminino",
      "Cor": "Cinzento, Rosa"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Safira",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Data",
      "Caixa do Relógio": "Pvd",
      "Bracelete": "Aço, Pvd",
      "Tamanho Caixa": "36",
      "Resistência Água": "Não",
      "Edição Especial": "Não"
    }
  };

  const product57Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "BRUCE",
      "Género": "Masculino", 
      "Cor": "Azul, Prateado"
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
      "Tamanho Caixa": "42",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  // Especificações do produto
  const product58Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "TYSON",
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
      "Funcionalidades": "Calendário",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  // Especificações do produto 59
  const product59Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "MAX",
      "Género": "Masculino",
      "Cor": "Azul, Prateado"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Calendário",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Desportivo"
    }
  };

  // Especificações do produto 60
  const product60Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "WESLEY",
      "Género": "Masculino",
      "Cor": "Dourado, Prateado, Preto"
    },
    hiddenSpecs: {
      "Is preowned": "Não",
      "Online exclusive": "Não",
      "Tipo de Artigo": "Relógios",
      "Kids": "Não",
      "Vidro Relógio": "Mineral",
      "Movimentos do Relógio": "Quartzo",
      "Funcionalidades": "Segundo fuso horário",
      "Caixa do Relógio": "Aço",
      "Bracelete": "Aço",
      "Tamanho Caixa": "44",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não"
    }
  };

  // Especificações do produto 61
  const product61Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "PAIGE",
      "Género": "Feminino",
      "Cor": "Madre-pérola"
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
      "Tamanho Caixa": "36",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

  // Especificações do produto 62
  const product62Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "ELLA",
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
      "Caixa do Relógio": "Aço, Cristais, Ionic Plated",
      "Bracelete": "Aço, Ionic Plated, Malha Milanesa",
      "Tamanho Caixa": "34",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "3 ATM",
      "Edição Especial": "Não"
    }
  };

  // Especificações do produto 63
  const product63Specs: ProductSpecs = {
    visibleSpecs: {
      "Marca": "Tommy Hilfiger Watches",
      "Coleção": "Jade",
      "Género": "Feminino",
      "Cor": "Dourado rosa, Prateado"
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
      "Tamanho Caixa": "30",
      "Resistência Água": "Sim",
      "Classificação Resistência à água": "5 ATM",
      "Edição Especial": "Não",
      "Estilo Relógio": "Clássico"
    }
  };

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
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 10,
      name: "Relógio Homem Automático BOSSMATIC",
      price: 399.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514212_Soldier_300dpi.png",
      description: generateSpecsTable(product10Specs),
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 11,
      name: "Relógio Homem Automático BOSSMATIC Gold",
      price: 449.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514180_Soldier_300dpi.png",
      description: generateSpecsTable(product11Specs),
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 12,
      name: "Relógio Homem TROPER AUTOMATIC",
      price: 349.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/1/5/1514200_Soldier_300dpi.png",
      description: generateSpecsTable(product12Specs),
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 13,
      name: "Relógio Homem Aço e Preto",
      price: 159.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300012_LRG_rgb_Web.png",
      description: generateSpecsTable(product13Specs),
      brandId: 2,
      categoryId: 1,
    },
    {
      id: 14,
      name: "Relógio Homem Multifunções Preto e Prateado em Aço",
      price: 219.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/5/25200459_LRG_rgb_Web.png",
      description: generateSpecsTable(product14Specs),
      brandId: 2,
      categoryId: 1,
    },
    {
      id: 15,
      name: "Relógio Homem Multifunções Castanho e Dourado em Aço",
      price: 239.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/5/25200442_LRG_rgb_Web.png",
      description: generateSpecsTable(product15Specs),
      brandId: 2,
      categoryId: 1,
    },
    {
      id: 16,
      name: "Relógio Homem Preto com Malha Milanesa em Aço",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/5/25300002_LRG_rgb_Web.png",
      description: generateSpecsTable(product16Specs),
      brandId: 2,
      categoryId: 1,
    },
    {
      id: 17,
      name: "Relógio Senhora Dourado e Preto",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300016_LRG_rgb_Web.png",
      description: generateSpecsTable(product17Specs),
      brandId: 2,
      categoryId: 2,
    },
    {
      id: 18,
      name: "Relógio Senhora Aço e Dourado",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25300014_LRG_rgb_Web.png",
      description: generateSpecsTable(product18Specs),
      brandId: 2,
      categoryId: 2,
    },
    {
      id: 19,
      name: "Relógio Senhora Rosa e Prateado em Aço",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/2/5/25100047.png",
      description: generateSpecsTable(product19Specs),
      brandId: 2,
      categoryId: 2,
    },
    {
      id: 20,
      name: "Relógio Masculino Frontier Preto com Brilhantes",
      price: 239.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/W/1/W1132G1_1.png",
      description: generateSpecsTable(product20Specs),
      brandId: 4,
      categoryId: 1,
    },
    {
      id: 21,
      name: "Relógio Masculino Frontier Dourado com Brilhantes",
      price: 349.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/W/0/W0799G2_1.png",
      description: generateSpecsTable(product21Specs),
      brandId: 4,
      categoryId: 1,
    },
    {
      id: 22,
      name: "RELÓGIO DOURADO PRETO 44MM",
      price: 129.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0726G2_1.png",
      description: generateSpecsTable(product22Specs),
      brandId: 4,
      categoryId: 1,
    },
    {
      id: 23,
      name: "Relógio Masculino Reputation Preto e Dourado",
      price: 179.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0710G2_1.png",
      description: generateSpecsTable(product23Specs),
      brandId: 4,
      categoryId: 1,
    },
    {
      id: 24,
      name: "Relógio Feminino Lady Idol Dourado",
      price: 189.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0605L2_1.png",
      description: generateSpecsTable(product24Specs),
      brandId: 4,
      categoryId: 2,
    },
    {
      id: 25,
      name: "Relógio Feminino G Check Dourado",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0292L2_1.png",
      description: generateSpecsTable(product25Specs),
      brandId: 4,
      categoryId: 2,
    },
    {
      id: 26,
      name: "Relógio Feminino Fawn Verde com Brilhantes",
      price: 189.9,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/G/W/GW0686L2_1.png",
      description: generateSpecsTable(product26Specs),
      brandId: 4,
      categoryId: 2,
    },
    {
      id: 27,
      name: "Jazzmaster Open Heart",
      price: 1225.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/3/H32675160_Web.png",
      description: generateSpecsTable(product27Specs),
      brandId: 5,
      categoryId: 1,
    },
    {
      id: 28,
      name: "Khaki Field Murph 38mm",
      price: 995.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/7/H70405730_WEB.png",
      description: generateSpecsTable(product28Specs),
      brandId: 5,
      categoryId: 1,
    },
    {
      id: 29,
      name: "Khaki Field Titanium Auto",
      price: 1145.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/7/H70545540-0606.png",
      description: generateSpecsTable(product29Specs),
      brandId: 5,
      categoryId: 1,
    },
    {
      id: 30,
      name: "Khaki Aviation Converter Auto 42mm",
      price: 1295.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/h/7/h76615130.png",
      description: generateSpecsTable(product30Specs),
      brandId: 5,
      categoryId: 1,
    },
    {
      id: 31,
      name: "Hamilton Khaki H70205140",
      price: 1195.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/b931ec91606cb7355a8b31bcc42f0b77/H/7/H70205140_Web.png",
      description: generateSpecsTable(product31Specs),
      brandId: 5,
      categoryId: 2,
    },
    {
      id: 32,
      name: "Relógio First Aço Azul",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/5/1530186.png",
      description: generateSpecsTable(product32Specs),
      brandId: 6, // Assumindo que HUGO Watches tenha o ID 6 no arquivo brands.ts
      categoryId: 1,
    },
    {
      id: 33,
      name: "Relógio #First Aço Preto",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/5/1530246.png",
      description: generateSpecsTable(product33Specs),
      brandId: 6,
      categoryId: 1,
    },
    {
      id: 34,
      name: "Relógio #Streetdiver Aço Pele Castanha",
      price: 159.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/5/1530220.png",
      description: generateSpecsTable(product34Specs),
      brandId: 6,
      categoryId: 1,
    },
    {
      id: 35,
      name: "Relógio Homem Multifunções #SMASH MULTI",
      price: 199.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/5/1530409_Soldier_300dpi.png",
      description: generateSpecsTable(product35Specs),
      brandId: 6,
      categoryId: 1,
    },
    {
      id: 36,
      name: "Relógio Homem Digital LC33 Branco",
      price: 99.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2011364_Soldier.png",
      description: generateSpecsTable(product36Specs),
      brandId: 7, // Assumindo que Lacoste Watches tenha o ID 7 no arquivo brands.ts
      categoryId: 1,
    },
    {
      id: 37,
      name: "Relógio Homem LISBON",
      price: 129.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2011372_Soldier.png",
      description: generateSpecsTable(product37Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 1,
    },
    {
      id: 38,
      name: "Relógio L.12.12 Move Azul Alumínio e Silicone",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2011241_C2_A71_C2_A7isth.png",
      description: generateSpecsTable(product38Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 1,
    },
    {
      id: 39,
      name: "Relógio Homem BOSTON Cronógrafo",
      price: 199.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2011347.png",
      description: generateSpecsTable(product39Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 1,
    },
    {
      id: 40,
      name: "Relógio Cannes Aço Dourado Rosa Pele Branca",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2011253-lrg-rgb-web.png",
      description: generateSpecsTable(product40Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 2, // Feminino
    },
    {
      id: 41,
      name: "Relógio Senhora RIGA Aço IP Dourado",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2001368.png",
      description: generateSpecsTable(product41Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 2, // Feminino
    },
    {
      id: 42,
      name: "Relógio Birdie Aço Dourado Rosa Pele Rosa",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/2/0/2001206.png",
      description: generateSpecsTable(product42Specs),
      brandId: 7, // Lacoste Watches
      categoryId: 2, // Feminino
    },
    {
      id: 43,
      name: "Relógio Sentry SS Preto",
      price: 275.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/a/3/a356-5084.png",
      description: generateSpecsTable(product43Specs),
      brandId: 8, // Nixon (nova marca)
      categoryId: 1, // Masculino
    },
    {
      id: 44,
      name: "DRIFTER 40 Super Black",
      price: 275.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/A/1/A1422-5288-view1.png",
      description: generateSpecsTable(product44Specs),
      brandId: 8, // Nixon
      categoryId: 1, // Masculino
    },
    {
      id: 45,
      name: "Relógio Masculino Sentry SS Azul e Prateado",
      price: 275.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/a/3/a356-2033.png",
      description: generateSpecsTable(product45Specs),
      brandId: 8, // Nixon
      categoryId: 1, // Masculino
    },
    {
      id: 46,
      name: "DRIFTER 40 Silver/Midnight",
      price: 275.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/A/1/A1422-5289-view1.png",
      description: generateSpecsTable(product46Specs),
      brandId: 8, // Nixon
      categoryId: 1, // Masculino
    },
    {
      id: 47,
      name: "Relógio Time Teller Acetate Dourado",
      price: 130.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/a/3/a327-3233.png",
      description: generateSpecsTable(product47Specs),
      brandId: 8, // Nixon
      categoryId: 2, // Feminino
    },
    {
      id: 48,
      name: "Relógio Siren Milanese Dourado",
      price: 150.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/a/1/a1272-502.png",
      description: generateSpecsTable(product48Specs),
      brandId: 8, // Nixon
      categoryId: 2, // Feminino
    },
    {
      id: 49,
      name: "Relógio Feminino Siren Milanese Rosa Dourado",
      price: 150.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/a/1/a1272-897.png",
      description: generateSpecsTable(product49Specs),
      brandId: 8, // Nixon
      categoryId: 2, // Feminino
    },
    {
      id: 50,
      name: "PR 100",
      price: 295.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/T/1/T150_410_11_091_00.png",
      description: generateSpecsTable(product50Specs),
      brandId: 9, // Tissot (nova marca)
      categoryId: 1, // Masculino
    },
    {
      id: 51,
      name: "CLASSIC DREAM",
      price: 295.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/t/1/t1294101605300.png",
      description: generateSpecsTable(product51Specs),
      brandId: 9, // Tissot
      categoryId: 1, // Masculino
    },
    {
      id: 52,
      name: "GENT XL",
      price: 325.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/t/1/t1164101104700.png",
      description: generateSpecsTable(product52Specs),
      brandId: 9, // Tissot
      categoryId: 1, // Masculino
    },
    {
      id: 53,
      name: "CLASSIC DREAM Branco",
      price: 345.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/t/1/t1294101101300.png",
      description: generateSpecsTable(product53Specs),
      brandId: 9, // Tissot
      categoryId: 1, // Masculino
    },
    {
      id: 54,
      name: "EVERYTIME 34MM",
      price: 345.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/T/1/T143.210.33.021.00_1_isth.png",
      description: generateSpecsTable(product54Specs),
      brandId: 9, // Tissot
      categoryId: 2, // Feminino
    },
    {
      id: 55,
      name: "PR 100 34MM",
      price: 345.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/T/1/T150_210_21_031_00.png",
      description: generateSpecsTable(product55Specs),
      brandId: 9, // Tissot
      categoryId: 2, // Feminino
    },
    {
      id: 56,
      name: "PR 100 SPORT CHIC",
      price: 475.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/t/1/t1019102206100.png",
      description: generateSpecsTable(product56Specs),
      brandId: 9, // Tissot
      categoryId: 2, // Feminino
    },
    {
      id: 57,
      name: "Relógio Homem Aço",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1710670_LRG_rgb_Web_Macys.png",
      description: generateSpecsTable(product57Specs),
      brandId: 10, // Tommy Hilfiger Watches (nova marca)
      categoryId: 1, // Masculino
    },
    {
      id: 58,
      name: "Relógio Homem Multifunções Aço",
      price: 169.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1710667_LRG_rgb_Web.png",
      description: generateSpecsTable(product58Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 1, // Masculino
    },
    {
      id: 59,
      name: "Relógio Azul Aço",
      price: 179.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1791973.png",
      description: generateSpecsTable(product59Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 1, // Masculino
    },
    {
      id: 60,
      name: "Relógio Homem Multifunções Aço Bicolor",
      price: 199.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1710627_LRG_POP.png",
      description: generateSpecsTable(product60Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 1, // Masculino
    },
    {
      id: 61,
      name: "Relógio Madrepérola Com Cristais e Aço",
      price: 139.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1782665.png",
      description: generateSpecsTable(product61Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 2, // Feminino
    },
    {
      id: 62,
      name: "Relógio Senhora Dourado Malha Milanesa",
      price: 149.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1782711_LRG_POP.png",
      description: generateSpecsTable(product62Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 2, // Feminino
    },
    {
      id: 63,
      name: "Relógio Mulher Aço Bicolor",
      price: 149.0,
      image: "https://de9mvi9pqgvkh.cloudfront.net/media/catalog/product/cache/dab390b481324d68ec6ea6d58c64f355/1/7/1782772_LRG_POP.png",
      description: generateSpecsTable(product63Specs),
      brandId: 10, // Tommy Hilfiger Watches
      categoryId: 2, // Feminino
    }
  ];

  return products.map((product) => ({
    ...product,
    slug: slugify(product.name), 
  }));
}