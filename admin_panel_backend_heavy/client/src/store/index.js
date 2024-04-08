import { configreStore } from "@reduxjs/toolkit";
import modeReducer from "store/modeSlice";

const store = configreStore({
  reducer: {
    mode: modeReducer,
  },
});

export default store;
