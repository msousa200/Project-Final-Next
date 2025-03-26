"use client";

import { Provider } from 'react-redux';
import { store, persistor } from '@/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, 
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <Toaster position="top-center" />
          </PersistGate>
        </Provider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}