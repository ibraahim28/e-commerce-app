import { createSlice } from "@reduxjs/toolkit";

const itemCounter = createSlice({
  name: "ItemCounter",
  initialState: {
    count: 0,
    isLoading: true,
    searchTerm: "",
  },
  reducers: {
    updateCounter: (state, action) => {
      if (typeof action.payload === "number") {
        state.count = action.payload;
      } else if (state.count === " increase") {
        state.count++;
      } else if (action.payload === "decrease") {
        state.count--;
      }
      return state;
    },
    updateLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload.trim();
      return state;
    },
  },
});

export default itemCounter.reducer;

export const { updateCounter, updateLoader, updateSearchTerm } =
  itemCounter.actions;
