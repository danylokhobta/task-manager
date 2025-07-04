// api/client.js
import axios from 'axios';
import API_CONFIG from './config';
import { refreshToken } from "./auth";
import { saveAccessToken } from '@/utils/authUtils';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: API_CONFIG.WITHCREDENTIALS,
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handles token refresh logic
api.interceptors.response.use(
  (response) => {
    return response;
  }, // Success case: just return the response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is caused by an expired or invalid token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Set _noRetry to true after retrying the request
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken(); // Refresh the token
        saveAccessToken(newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // In case of any other error, just reject the request with the error
    return Promise.reject();
  }
);

export default api;