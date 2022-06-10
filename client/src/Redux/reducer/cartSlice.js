import { createSlice, nanoid } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(data, price, type) {
        console.log(data, price, type);
        return {
          payload: {
            id: nanoid(),
            data,
            price,
            type,
          },
        };
      },
    },
    removeItemFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    removeAllItem: (state) => (state = []),
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItem } =
  cartSlice.actions;

export default cartSlice.reducer;
