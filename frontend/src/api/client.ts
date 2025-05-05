// api/client.js
import axios from 'axios';
import API_CONFIG from './config';
import { setLoading, setLoaded } from "../store/globalStore";
import handleError from "../utils/errorHandlerUtil";
import { refreshToken } from "./auth";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: API_CONFIG.WITHCREDENTIALS,
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    setLoading();
    const token = localStorage.getItem('token');
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
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    setLoaded();
    return response;
  }, // Success case: just return the response
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is caused by an expired or invalid token
    if (error.response) {
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
    } else {
      // In case of any other error, just reject the request with the error
      handleError({
        message: error.response.data.message,
        error
      })
      setLoaded();
      return Promise.reject();
    }
  }
);

export default apiClient;