import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducer";

const store = configureStore({
  reducer: {
    counter,
    
  },
});

export default store;