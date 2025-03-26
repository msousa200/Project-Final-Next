export const clearAllFilters = () => {
  try {
    localStorage.removeItem('selectedBrands');
    localStorage.removeItem('sortOption');
    
    localStorage.removeItem('menSelectedBrands');
    localStorage.removeItem('menSortOption');
    
    localStorage.removeItem('womenSelectedBrands');
    localStorage.removeItem('womenSortOption');
    
    localStorage.removeItem('searchSelectedBrands');
    localStorage.removeItem('searchSortOption');
  } catch (error) {
    console.error('Erro ao limpar filtros:', error);
  }
};