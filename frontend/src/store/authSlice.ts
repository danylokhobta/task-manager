import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessToken } from "types/user";

// Function to get the entire state from localStorage or return default initial state
const getInitialState = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : {
    accessToken: null,
    isAuthenticated: false,
  };
};

interface AuthState {
  accessToken: AccessToken;
  isAuthenticated: boolean;
}

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<AccessToken>) {
      state.accessToken = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    setIsAuthenticated(state, action: PayloadAction<AuthState['isAuthenticated']>) {
      state.isAuthenticated = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    resetCookie() {
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
    }
  },
});

export const { setAccessToken, setIsAuthenticated, resetCookie } = authSlice.actions;
export default authSlice.reducer;
