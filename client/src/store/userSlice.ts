'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDTO } from "@/schemas/user";
import { LoadStatus } from "@/schemas/global";

type UserState = {
  user: UserDTO | null;
  status: LoadStatus;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDTO>) {
      state.user = action.payload;
      state.status = "success";
    },
    removeUser(state) {
      state.user = null;
      state.status = "idle";
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "error";
    },
    setIsLoading(state) {
      state.status = 'loading';
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
