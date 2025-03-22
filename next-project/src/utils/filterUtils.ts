/**
 * Limpa todos os filtros e opções de ordenação do localStorage
 */
export const clearAllFilters = () => {
  try {
    // Limpar filtros da página principal
    localStorage.removeItem('selectedBrands');
    localStorage.removeItem('sortOption');
    
    // Limpar filtros da página masculina
    localStorage.removeItem('menSelectedBrands');
    localStorage.removeItem('menSortOption');
    
    // Limpar filtros da página feminina
    localStorage.removeItem('womenSelectedBrands');
    localStorage.removeItem('womenSortOption');
    
    // Limpar filtros da página de pesquisa
    localStorage.removeItem('searchSelectedBrands');
    localStorage.removeItem('searchSortOption');
  } catch (error) {
    console.error('Erro ao limpar filtros:', error);
  }
};