import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "store/modeSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
});

export default store;
