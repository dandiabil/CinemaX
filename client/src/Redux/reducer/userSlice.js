import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    checkAuthenticity: (state, action) => {
      if (action.payload.isAuthenticated) state.isAuthenticated = true;
      return state;
    },
    userLogOut: (state) => {
      state.isAuthenticated = false;
      return state;
    },
  },
});

export const { checkAuthenticity, userLogOut } = userSlice.actions;

export default userSlice.reducer;
