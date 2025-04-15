import { handleApiCall } from "./apiCallHandler";
import api from "./api";

/**
 * Refreshes the access token using the refresh token stored in cookies.
 * @returns A new access token or null if the refresh fails.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const response = await handleApiCall(api.post("/auth/refresh-token", {}, { _retryWithNewToken: false }));
  if (response.success) {
    return response.data.accessToken;
  } else {
    return null;
  }
};

/**
 * Verifies the provided password against the stored credentials.
 * @param password The password to verify.
 * @returns True if the password is valid, false otherwise.
 */
export const verifyPassword = async (password: string): Promise<boolean | null> => {
  const response = await handleApiCall(api.post("/auth/verify-password", { password }));
  if (response.success) {
    return response.data.isPasswordValid;
  } else {
    return null;
  }
};