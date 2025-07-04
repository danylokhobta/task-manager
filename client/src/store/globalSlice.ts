'use client';
import { createSlice } from "@reduxjs/toolkit";
import { LoadStatus } from "@/schemas/global";

type GlobalState = {
  globalStatus: LoadStatus;
};

const initialState: GlobalState = {
  globalStatus: "idle",
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalStatus(state, action) {
      state.globalStatus = action.payload;
    },
  },
});

export const { setGlobalStatus } = globalSlice.actions;
export default globalSlice.reducer;