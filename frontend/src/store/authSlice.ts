import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Function to get the entire state from localStorage or return default initial state
const getInitialState = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : {
    isAuthenticated: false,
  };
};

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<AuthState['isAuthenticated']>) {
      state.isAuthenticated = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    resetCookie() {
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
    }
  },
});

export const { setIsAuthenticated, resetCookie } = authSlice.actions;
export default authSlice.reducer;
