import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessToken } from "types/user";

// Function to get the entire state from localStorage or return default initial state
const getInitialState = (): GlobalState => {
  const storedState = localStorage.getItem('glocalState');
  return storedState ? JSON.parse(storedState) : {
    accessToken: null,
    isAuthenticated: false,
  };
};

interface GlobalState {
  accessToken: AccessToken;
  isAuthenticated: boolean;
}

const initialState: GlobalState = getInitialState();

const authSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<AccessToken>) {
      state.accessToken = action.payload;
      localStorage.setItem('glocalState', JSON.stringify(state));
    },
    setIsAuthenticated(state, action: PayloadAction<GlobalState['isAuthenticated']>) {
      state.isAuthenticated = action.payload;
      console.log("isAuth is: ", action.payload);
      localStorage.setItem('glocalState', JSON.stringify(state));
    },
    resetCookie() {
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
    }
  },
});

export const { setAccessToken, setIsAuthenticated, resetCookie } = authSlice.actions;
export default authSlice.reducer;
