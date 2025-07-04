import axios from "axios";
import api from "./client";
import API_CONFIG from "./config";
import {
  SignupRequestDTO,
  signupResponseSchema,

  SigninRequestDTO,
  signinResponseSchema
} from "@schemas/auth";

// Create a new user (signup)
export const signup = async (userData: SignupRequestDTO) => {
  try {
    const response = await api.post(`${API_CONFIG.ENDPOINTS.AUTH}/signup`, userData);
    const parsed = signupResponseSchema.parse(response.data);
    return parsed;
  } catch (err) {
    throw err;
  }
};

// Get user (signin)
export const signin = async (credentials: SigninRequestDTO) => {
  try {
    const response = await api.post(`${API_CONFIG.ENDPOINTS.AUTH}/signin`, credentials);
    const parsed = signinResponseSchema.parse(response.data);
    return parsed
  } catch (err) {
    throw err;
  }
};

/**
 * Refreshes the access token using the refresh token stored in cookies.
 * @returns A new access token or null if the refresh fails.
 */

// Function to refresh token
export const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/refresh-token`,
      {},
      {
        withCredentials: true, // <- this sends cookies (important for refresh tokens)
      }
    );
    return response.data.access_token;
  } catch (err) {
    throw err;
  }
};
