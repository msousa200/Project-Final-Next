import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  userId?: string | null;
  userData?: UserData | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  userId: null,
  userData: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.total += action.payload.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.total += action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        state.total += (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
      }
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userId = action.payload.id;
      state.userData = action.payload;
    },
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setUser,
  updateUserData,
  clearUser,
  clearCart,
  setCartItems, 
} = cartSlice.actions;

export default cartSlice.reducer;