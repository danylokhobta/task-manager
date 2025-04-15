import { store } from "../store";
import { getUser, createUser } from "../api/user";
import { verifyPassword as verifyPasswordApi } from "../api/auth";
import { setUser, removeUser } from "../store/userSlice";
import { setAccessToken, setIsAuthenticated, resetCookie } from "../store/authSlice";
import { GetUserRequest, CreateUserRequest } from "../types/user";
import { showToast } from "../store/toastStore";
import { ToastType } from "../store/toastStore";

export const login = async ({ email, password }: GetUserRequest): Promise<boolean> => {
  const response = await getUser({ email, password });
  if (response && response.accessToken) {
    store.dispatch(setUser(response.user));
    store.dispatch(setAccessToken(response.accessToken));
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
  const response = await createUser({ email, password, name });
  if (response && response.accessToken) {
    store.dispatch(setUser(response.user));
    store.dispatch(setAccessToken(response.accessToken));
    store.dispatch(setIsAuthenticated(true));
    showToast("Registration successful", "success");
    return true;
  } else {
    showToast("Registration failed", "error");
    console.error("Error registering user");
    return false;
  }
};

export const verifyPassword = async (password: string): Promise<boolean | null> => {
  const isValid = await verifyPasswordApi(password);
  const message = isValid ? "Password is valid" : "Password is invalid";
  showToast(message, "info");
  return isValid;
};