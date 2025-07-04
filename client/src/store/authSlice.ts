'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadStatus } from "@/schemas/global";

type UserState = {
  status: LoadStatus;
  error: string | null;
};

const initialState: UserState = {
  status: "idle",
  error: null,
}

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "error";
    },
  },
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
