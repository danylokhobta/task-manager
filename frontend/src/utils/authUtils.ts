import { store } from "../store";
import { signin, signup } from "../api/auth";
import { removeUser } from "../store/userSlice";
import { setIsAuthenticated, resetCookie } from "../store/authSlice";
import { GetUserRequest, CreateUserRequest } from "../types/user";
import { showToast } from "../hooks/useToast";
import { ToastType } from "../hooks/useToast";

export const login = async ({ email, password }: GetUserRequest) => {
  try {
    await signin({ email, password });
    store.dispatch(setIsAuthenticated(true));
    showToast("Login successful", "success");
  } catch(err) {
    showToast("Error logging in", "error");
    console.error("Error logging in");
    throw err;
  }
};

export const register = async ({ email, password, name }: CreateUserRequest) => {
  try {
    await signup({ email, password, name });
    store.dispatch(setIsAuthenticated(true));
    showToast("Registration successful", "success");
  } catch(err) {
    showToast("Registration failed", "error");
    console.error("Error registering user");
    throw err;
  }
};

export const logout = (message: string = "Logout successful", type: ToastType = "success") => {
  store.dispatch(removeUser());
  store.dispatch(setIsAuthenticated(false));
  store.dispatch(resetCookie());
  showToast(message, type);
};
