import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  folders: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};

const initialState: initialStateType = {
  folders: [],
};

export const Folders = createSlice({
  name: "folders",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<initialStateType>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = Folders.actions;
export default Folders.reducer;
