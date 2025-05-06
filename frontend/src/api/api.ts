import axios from "axios";
import { setAccessToken } from "../store/authSlice";
import { store } from "../store";
import { refreshToken } from "./auth";
import handleError from "../utils/errorHandlerUtil";
import { setLoading, setLoaded } from "../store/globalStore";

const API_URL = import.meta.env.VITE_API_URL;

declare module 'axios' {
  export interface AxiosRequestConfig {
    _noRetry?: boolean; // Custom flag to prevent retry
  }
  export interface InternalAxiosRequestConfig {
    _noRetry?: boolean;
  }
}

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Ensures cookies (refreshToken) are included automatically
  _noRetry: false, // Default value is false, meaning no retry yet
});

// Request interceptor: Adds the access token to headers
api.interceptors.request.use(
  (config) => {
    setLoading();
    const token = store.getState().auth.accessToken;
    console.log("The token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    handleError({
      message: "Request error",
      error,
    });
    return Promise.reject();
  }
);

// Response interceptor: Handles token refresh logic
api.interceptors.response.use(
  (response) => {
    setLoaded();
    return response;
  }, // Success case: just return the response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is caused by an expired or invalid token
    if (error.response?.status === 401 && !originalRequest._noRetry) {
      console.log("Starting access token refreshing process");

      // Set _noRetry to true after retrying the request
      originalRequest._noRetry = true; // Set flag to prevent further retries

      try {
        const newAccessToken = await refreshToken(); // Refresh the token

        if (newAccessToken === null) {
          handleError({
            message: "Refresh token failed, access token is null",
            error,
            logout: true,
          });
          setLoaded();
          return Promise.reject();
        }

        store.dispatch(setAccessToken(newAccessToken)); // Update the access token in the store
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Set new token in the header
        return api(originalRequest); // Retry the original request with the new token
      } catch (error) {
        handleError({
          message: "Token refresh failed",
          error,
          logout: true,
        });
        setLoaded();
        return Promise.reject();
      }
    }

    // In case of any other error, just reject the request with the error
    handleError({
      message: error.response?.data.message,
      error,
    });
    setLoaded();
    return Promise.reject();
  }
);

export default api;