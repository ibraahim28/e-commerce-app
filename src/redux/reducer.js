import { createSlice } from "@reduxjs/toolkit";

const itemCounter = createSlice({
  name: "ItemCounter",
  initialState: {
    count : 0, 
    isLoading: true,
  },
  reducers: {
    updateCounter: (state, action) => {
      if (action.payload === "increase") state.count++;
      else state.count--;
      return state;
    },
    updateLoader: (state,action) => {
      state.isLoading = action.payload;
    }
    
  },
});

export default itemCounter.reducer;

export const { updateCounter, updateLoader } = itemCounter.actions;
