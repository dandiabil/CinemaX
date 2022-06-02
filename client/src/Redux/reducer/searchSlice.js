import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    getMovies: (state, action) => {
      state = action.payload.data;
      return state;
    },
  },
});

export const { getMovies } = searchSlice.actions;

export default searchSlice.reducer;
