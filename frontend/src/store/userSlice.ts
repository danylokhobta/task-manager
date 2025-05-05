import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";

const initialState = {
  isUserLoaded: false as boolean | null,
  user: {} as User | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserIsLoading(state) {
      state.isUserLoaded = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = {
        ...action.payload,
        ...state.user
      }
      state.isUserLoaded = true;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    removeUser(state) {
      state.user = null;
      state.isUserLoaded = false;
      localStorage.setItem('userState', JSON.stringify(state));
    },
  },
});

export const { setUser, removeUser, setUserIsLoading } = userSlice.actions;
export default userSlice.reducer;
