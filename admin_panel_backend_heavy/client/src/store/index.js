import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "store/modeSlice";
import authReducer from "store/authSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
  },
});

export default store;
