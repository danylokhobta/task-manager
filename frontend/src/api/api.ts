import axios from "axios";
import { refreshToken } from "./auth";
import handleError from "../utils/errorHandlerUtil";
import { setLoading, setLoaded } from "../store/globalStore";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Ensures cookies (refreshToken) are included automatically
});

// Request interceptor: Adds the access token to headers
api.interceptors.request.use(
  (config) => {
    setLoading();
    const token = sessionStorage.getItem("access_token");
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Starting access token refreshing process");

      // Set _noRetry to true after retrying the request
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken(); // Refresh the token
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        handleError({
          message: "Token refresh failed",
          error,
          logout: true,
        });
        setLoaded();
        return Promise.reject(error);
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