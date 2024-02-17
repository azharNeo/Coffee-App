import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: {size: string; price: string; currency: string}[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
  quantity: number;
}

interface ProductState {
  product: Product[];
}

const initialState: ProductState = {
  product: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<Product[]>) => {
      state.product.push(...action.payload);
    },
    incrementQty: (state, action: PayloadAction<{id: string}>) => {
      const itemPresent = state.product.find(
        item => item.id === action.payload.id,
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQty: (state, action: PayloadAction<{id: string}>) => {
      const itemPresent = state.product.find(
        item => item.id === action.payload.id,
      );
      if (itemPresent && itemPresent.quantity === 1) {
        const removeItem = state.product.filter(
          item => item.id !== action.payload.id,
        );
        state.product = removeItem;
      } else if (itemPresent) {
        itemPresent.quantity--;
      }
    },
  },
});

export const {getProducts, incrementQty, decrementQty} = productSlice.actions;

export default productSlice.reducer;
