import { createSlice } from "@reduxjs/toolkit";

const itemCounter = createSlice({
  name: "ItemCounter",
  initialState: 0,
  reducers: {
    updateCounter: (state, action) => {
      if (action.payload === "increase") state++;
      else state--;
      return state;
    },
  },
});

export default itemCounter.reducer;

export const { updateCounter } = itemCounter.actions;
