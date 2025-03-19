"use client";

import { Provider } from 'react-redux';
import { store, persistor } from '@/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
          <Toaster position="top-center" />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}