import { createSlice } from "@reduxjs/toolkit";

export const headerNavigationSlice = createSlice({
  name: "headerNavigationSlice",
  initialState: {
    fixedNav: false,
  },
  reducers: {
    setNavFixed: (state, action) => {
      state.fixedNav = action.payload;
    },
  },
});

export const { setNavFixed } = headerNavigationSlice.actions;

export default headerNavigationSlice.reducer;
