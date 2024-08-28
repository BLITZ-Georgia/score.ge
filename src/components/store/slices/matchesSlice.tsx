import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatches: [],
  allTournaments: [],
  allStages: [],
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setAllMatches: (state, action) => {
      state.allMatches = action.payload;
    },
    setAllTournament: (state, action) => {
      state.allTournaments = action.payload;
    },
    setAllStages: (state, action) => {
      state.allStages = action.payload;
    },
  },
});

export const {
  setAllMatches,
  setAllTournament,
  setAllStages,
} = matchSlice.actions;
export default matchSlice.reducer;
