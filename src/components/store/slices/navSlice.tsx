import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navSlice",
  initialState: {
    sportId: 1,
  },
  reducers: {
    setSportIdUpdated: (state, action) => {
      state.sportId = action.payload;
    },
  },
});

export const { setSportIdUpdated } = navSlice.actions;

export default navSlice.reducer;
