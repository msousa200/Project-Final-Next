import '@testing-library/jest-dom';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-"); 
}

describe('Função slugify', () => {
  test('converte texto com espaços em slug', () => {
    expect(slugify('BOSS Chronograph')).toBe('boss-chronograph');
  });

  test('converte caracteres especiais', () => {
    expect(slugify('Relógio & Pulseira')).toBe('relgio-pulseira');
  });

  test('remove espaços extras', () => {
    expect(slugify('Relógio  Masculino  Premium')).toBe('relgio-masculino-premium');
  });

  test('converte tudo para minúsculas', () => {
    expect(slugify('RELÓGIO PREMIUM')).toBe('relgio-premium');
  });
});