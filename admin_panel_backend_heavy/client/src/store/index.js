import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "store/modeSlice";
import authReducer from "store/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./query/api";

const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;
