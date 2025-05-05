import { handleApiCall } from "./apiCallHandler";
import api from "./api";
import { 
  GetUserResponse, 
  UpdateUserRequest,
} from "types/user";
import handleError from "../utils/errorHandlerUtil";

// Get user by token (refetch)
export const getMe = async (): Promise<GetUserResponse | null> => {
  const response = await handleApiCall(api.get("/user/me"));
  if (response.success) {
    return response.data;
  } else {
    return null;
  }
};

// Update user details
export const updateUser = async (userData: UpdateUserRequest): Promise<boolean> => {
  const response = await handleApiCall(api.put("/user/update", userData));
  if (response.success) {
    console.log("User updated successfully:", response);
    return true;
  } else {
    handleError({
      message: `Error updating user: ${response.message}
    `})
    return false;
  }
};

// Delete user account
export const deleteUser = async (): Promise<boolean | null> => {
  const response = await handleApiCall(api.delete("/user/delete"));
  if (response.success) {
    console.log("User deleted successfully");
    return true;
  } else {
    handleError({
      message: `Error deleting user: ${response.message}
    `})
    return null;
  }
};