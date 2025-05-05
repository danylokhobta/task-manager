import axios from "axios";
import { setAccessToken } from "../store/authSlice";
import { store } from "../store";
import { refreshToken } from "./auth";
import handleError from "../utils/errorHandlerUtil";
import { setLoading, setLoaded } from "../store/globalStore";

const API_URL = import.meta.env.VITE_API_URL;

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retryWithNewToken?: boolean; // your custom flag
  }
  export interface InternalAxiosRequestConfig {
    _retryWithNewToken?: boolean;
  }
}

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Ensures cookies (refreshToken) are included automatically
});

// Request interceptor: Adds the access token to headers
api.interceptors.request.use(
  (config) => {
    setLoading();
    const token = store.getState().global.accessToken;
    config._retryWithNewToken = true;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    handleError({
      message: "Request error",
      error,
    })
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
    if (
      (error.response?.status === 401) &&
      originalRequest._retryWithNewToken
    ) {
      console.log("Starting access token refreshing process");
      originalRequest._retryWithNewToken = false; // Ensure there is no loop
      // Try refreshing the access token with the refresh token
      try {
        const newAccessToken = await refreshToken(); // Make the refresh token request

        if (newAccessToken === null) {
          handleError({
            message: "Refresh token failed, access token is null",
            error,
            logout: true,
          })
          setLoaded();
          return Promise.reject();
        }

        store.dispatch(setAccessToken(newAccessToken)); // Update the access token in the store
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Set the new token in the header
        return api(originalRequest); // Retry the original request with the new token
      } catch (error) {
        handleError({
          message: "Token refresh failed",
          error,
          logout: true,
        })
        setLoaded();
        return Promise.reject();
      }
    }

    // In case of any other error, just reject the request with the error
    handleError({
      message: error.response.data.message,
      error
    })
    setLoaded();
    return Promise.reject();
  }
);

export default api;