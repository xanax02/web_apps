"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleare) =>
    getDefaultMiddleare({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
