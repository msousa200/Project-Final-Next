import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BrandFilter from '@/components/BrandFilter/BrandFilter';

jest.mock('@/data/brands', () => ({
  brands: [
    { id: 1, name: 'BOSS' },
    { id: 2, name: 'CALVIN KLEIN' },
    { id: 3, name: 'GANT' }
  ]
}));

describe('BrandFilter Component', () => {
  const mockHandleBrandChange = jest.fn();
  const mockHandleClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza todas as marcas corretamente', () => {
    render(
      <BrandFilter 
        selectedBrands={[]}
        onBrandChange={mockHandleBrandChange}
        onClearFilters={mockHandleClearFilters}
      />
    );
    
    expect(screen.getByText('BOSS')).toBeInTheDocument();
    expect(screen.getByText('CALVIN KLEIN')).toBeInTheDocument();
    expect(screen.getByText('GANT')).toBeInTheDocument();
  });

  test('marca corretamente as marcas selecionadas', () => {
    render(
      <BrandFilter 
        selectedBrands={[1, 3]}
        onBrandChange={mockHandleBrandChange}
        onClearFilters={mockHandleClearFilters}
      />
    );
    
    const bossCheckbox = screen.getByLabelText('BOSS', { exact: false });
    const ckCheckbox = screen.getByLabelText('CALVIN KLEIN', { exact: false });
    const gantCheckbox = screen.getByLabelText('GANT', { exact: false });
    
    expect(bossCheckbox).toBeChecked();
    expect(ckCheckbox).not.toBeChecked();
    expect(gantCheckbox).toBeChecked();
  });

  test('chama a função onBrandChange quando uma marca é clicada', () => {
    render(
      <BrandFilter 
        selectedBrands={[1]}
        onBrandChange={mockHandleBrandChange}
        onClearFilters={mockHandleClearFilters}
      />
    );
    
    fireEvent.click(screen.getByLabelText('CALVIN KLEIN', { exact: false }));
    
    expect(mockHandleBrandChange).toHaveBeenCalledWith(2);
  });

  test('chama a função onClearFilters quando o botão é clicado', () => {
    render(
      <BrandFilter 
        selectedBrands={[1, 2]}
        onBrandChange={mockHandleBrandChange}
        onClearFilters={mockHandleClearFilters}
      />
    );
    
    fireEvent.click(screen.getByText('Limpar filtros', { exact: false }));
    
    expect(mockHandleClearFilters).toHaveBeenCalled();
  });
});