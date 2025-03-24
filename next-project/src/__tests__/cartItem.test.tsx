import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from '@/components/Cart';
import cartReducer from '@/features/cartSlice';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/carrinho'
  })
}));

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Test User', email: 'test@example.com' } },
    status: 'authenticated'
  })
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mocked-image" />
  )
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [
          { 
            id: '1', 
            name: 'BOSS Relógio Classic', 
            price: 299.99, 
            image: '/relogio1.jpg', 
            quantity: 1 
          }
        ],
        total: 299.99,
        userId: 'test-user-id',
        userData: { 
          id: 'test-user-id', 
          name: 'Test User', 
          email: 'test@example.com', 
          dateOfBirth: '01/01/1990' 
        }
      }
    }
  });
};

describe('Cart Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  test('renderiza os itens do carrinho corretamente', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    expect(screen.getByText('BOSS Relógio Classic')).toBeInTheDocument();
    
    expect(screen.getByText('299,99 €', { selector: 'p.text-gray-600' })).toBeInTheDocument();
    
    expect(screen.getByText('299,99 €', { selector: 'span.text-2xl' })).toBeInTheDocument();
    
    expect(screen.getByText('1', { selector: 'span.w-8' })).toBeInTheDocument();
  });

  test('incrementa a quantidade do item corretamente', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    const incrementButton = screen.getByLabelText('Aumentar quantidade');
    fireEvent.click(incrementButton);
    
    expect(screen.getByText('2', { selector: 'span.w-8' })).toBeInTheDocument();
    
    expect(screen.getByText('599,98 €', { selector: 'span.text-2xl' })).toBeInTheDocument();
  });

  test('remove um item do carrinho', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    const removeButton = screen.getByLabelText('Remover item');
    fireEvent.click(removeButton);
    
    expect(screen.getByText('O seu carrinho está vazio.')).toBeInTheDocument();
    
    expect(screen.queryByText('Finalizar Compra')).not.toBeInTheDocument();
  });

  test('exibe a imagem do produto corretamente', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    
    const productImage = screen.getByAltText('BOSS Relógio Classic');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', '/relogio1.jpg');
  });
});