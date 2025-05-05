import { handleApiCall } from "./apiCallHandler";
import handleError from "../utils/errorHandlerUtil";
import { 
  GetUserRequest, 
  CreateUserRequest, 
  CreateUserResponse, 
  GetUserResponse,
} from "types/user";
import api from "./api";


// Create a new user
export const signup = async (userData: CreateUserRequest): Promise<CreateUserResponse | null> => {
  const response = await handleApiCall(api.post("/auth/signup", userData));
  if (response.success) {
    console.log("User created successfully:", response.data);
    return response.data || null;
  } else {
    handleError({
      message: `Error creating user: ${response.message}
    `})
    return null;
  }
};

// Get user (signin)
export const signin = async (credentials: GetUserRequest): Promise<GetUserResponse | null> => {
  const response = await handleApiCall(api.post("/auth/signin", credentials));
  if (response.success) {
    return response.data || null;
  } else {
    handleError({
      message: `Error getting user: ${response.message}
    `})
    return null;
  }
};

/**
 * Refreshes the access token using the refresh token stored in cookies.
 * @returns A new access token or null if the refresh fails.
 */
export const refreshToken = async (): Promise<string | null> => {
  const response = await handleApiCall(api.post("/auth/refresh-token"));
  if (response.success) {
    return response.data.access_token;
  } else {
    return null;
  }
};