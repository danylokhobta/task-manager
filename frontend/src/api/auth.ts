import { handleApiCall } from "./apiCallHandler";
import { 
  GetUserRequest, 
  CreateUserRequest, 
} from "types/user";
import api from "./api";
import axios from "axios";


// Create a new user
export const signup = async (userData: CreateUserRequest) => {
  try {
    const response = await handleApiCall(api.post("/auth/signup", userData));
    sessionStorage.setItem("access_token", response.data.access_token);
    return response.data.access_token;
  } catch (err) {
    throw err;
  }
};

// Get user (signin)
export const signin = async (credentials: GetUserRequest) => {
  try {
    const response = await handleApiCall(api.post("/auth/signin", credentials));
    sessionStorage.setItem("access_token", response.data.access_token);
    return response.data.access_token;
  } catch (err) {
    throw err;
  }
};

/**
 * Refreshes the access token using the refresh token stored in cookies.
 * @returns A new access token or null if the refresh fails.
 */

// Function to refresh token
export const refreshToken = async () => {
  const response = await axios.post("https://your-api.com/auth/refresh");
  sessionStorage.setItem("access_token", response.data.access_token);
  return response.data.access_token;
};