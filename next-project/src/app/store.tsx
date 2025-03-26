/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "@/features/cartSlice";
import userReducer from "@/features/userSlice";

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'total'] 
};

// Use combineReducers para criar o rootReducer corretamente tipado
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;