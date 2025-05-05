import { store } from "../store";
import { signin, signup } from "../api/auth";
import { setUser, removeUser } from "../store/userSlice";
import { setAccessToken, setIsAuthenticated, resetCookie } from "../store/authSlice";
import { GetUserRequest, CreateUserRequest } from "../types/user";
import { showToast } from "../hooks/useToast";
import { ToastType } from "../hooks/useToast";

export const login = async ({ email, password }: GetUserRequest): Promise<boolean> => {
  const response = await signin({ email, password });
  if (response && response.access_token && response !== null) {
    store.dispatch(setAccessToken(response.access_token));
    store.dispatch(setIsAuthenticated(true));
    showToast("Login successful", "success");
    return true;
  } else {
    showToast("Error logging in", "error");
    console.error("Error logging in");
    return false;
  }
};

export const logout = (message: string = "Logout successful", type: ToastType = "success") => {
  store.dispatch(removeUser());
  store.dispatch(setAccessToken(null));
  store.dispatch(setIsAuthenticated(false));
  store.dispatch(resetCookie());
  showToast(message, type);
};

export const register = async ({ email, password, name }: CreateUserRequest): Promise<boolean> => {
  const response = await signup({ email, password, name });
  if (response && response.access_token) {
    store.dispatch(setAccessToken(response.access_token));
    store.dispatch(setIsAuthenticated(true));
    showToast("Registration successful", "success");
    return true;
  } else {
    showToast("Registration failed", "error");
    console.error("Error registering user");
    return false;
  }
};