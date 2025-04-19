import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: initialStateType = {
  workspaces: [],
};

export const Worksapces = createSlice({
  name: "workspaces",
  initialState: initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<initialStateType>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = Worksapces.actions;
export default Worksapces.reducer;
