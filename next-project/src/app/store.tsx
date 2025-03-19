"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "@/features/cartSlice";
import userReducer from "@/features/userSlice";

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'total'] 
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;