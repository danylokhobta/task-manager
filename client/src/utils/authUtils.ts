'use client';
import { store } from "../store";
import { signin as signinAPI, signup as signupAPI } from "../api/auth";
import { userActions } from "@store/userSlice";
import { SigninRequestDTO, SignupRequestDTO } from "@/schemas/auth";
import { setError } from "@/store/authSlice";

export const signin = async ({ email, password }: SigninRequestDTO) => {
  try {
    const response = await signinAPI({ email, password });
    saveAccessToken(response.access_token);
    console.log('Successfully signed in.');
  } catch(err) {
    store.dispatch(setError(`Error signing in: ${err}`));
    console.error("Error signing in:", err);
  }
};

export const signup = async ({ email, password, name }: SignupRequestDTO) => {
  try {
    const response = await signupAPI({ email, password, name });
    saveAccessToken(response.access_token);
    console.log('Successfully signed up.');
  } catch(err) {
    store.dispatch(setError(`Error signing up: ${err}`));
    console.error("Error signing up:", err);
  }
};

export const signout = () => {
  store.dispatch(userActions.removeUser());
  resetCookies();
  console.log('Successfully signed out.');
};

export const saveAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
}

export const resetCookies = () => {
  document.cookie = "refresh_token=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
}