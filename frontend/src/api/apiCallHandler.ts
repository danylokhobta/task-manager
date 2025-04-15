import { AxiosResponse } from "axios";

export type ApiResponse<T> = {
  success: boolean; // Determines if the call was successful
  data?: T; // The data returned by the API
  message?: string; // Error or success message
  status?: number; // HTTP status code
};

/**
 * Centralized API utility to wrap API calls with unified error handling and response structure.
 * @param apiCall The API call to execute (must return a Promise)
 * @returns ApiResponse with standardized structure
 */
export const handleApiCall = async <T>(
  apiCall: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall; // Execute API call
    if(response?.data) {
      return { success: true, data: response.data }; // Standardized success response
    }
    return { success: false };
  } catch (error: any) {
    console.error("API Error:", error);

    const message = error.response?.data?.message || "An unexpected error occurred";
    const status = error.response?.status || 500;

    return { success: false, message, status }; // Standardized error response
  }
};
