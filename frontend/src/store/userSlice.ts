import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";

const initialState: User = {
  id: undefined,
  email: undefined,
  name: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      localStorage.setItem('userState', JSON.stringify(state));
    },
    removeUser(state) {
      state.id = undefined;
      state.email = undefined;
      state.name = undefined;
      localStorage.setItem('userState', JSON.stringify(state));
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
