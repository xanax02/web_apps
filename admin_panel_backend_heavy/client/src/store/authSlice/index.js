import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "63701cc1f03239b7f700000e",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: () => {},
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
