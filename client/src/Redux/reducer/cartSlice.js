import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      const cart = {
        id: new Date().getTime(),
        data: action.payload.data,
        price: action.payload.price,
        type: action.payload.type,
      };
      state.push(cart);
    },
    removeItemFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    removeAllItem: (state) => {
      return (state = []);
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItem } =
  cartSlice.actions;

export default cartSlice.reducer;
