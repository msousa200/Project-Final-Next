import '@testing-library/jest-dom';
import { categories } from '@/data/categories';

describe('Categorias', () => {
  test('deve ter as categorias de homem e mulher', () => {
    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe('Men');
    expect(categories[1].name).toBe('Women');
  });

  test('cada categoria tem um ID único', () => {
    const ids = categories.map(cat => cat.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds.length).toBe(categories.length);
  });
});