import { updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from "../api/user"; // Import the function
import { UpdateUserRequest } from "../types/user";
import { logout } from "./authUtils";
import { showToast } from "../hooks/useToast";

// Function to handle user update
export const updateUser = async (userData: UpdateUserRequest): Promise<boolean> => {
  const response = await apiUpdateUser(userData);
  if (response) {
    showToast("User updated successfully", "success");
    return true;
  } else {
    showToast("Error updating user", "error");
    console.error("Error updating user");
    return false;
  }
};

// Function to handle user deletion
export const deleteUser = async (): Promise<boolean> => {
  const response = await apiDeleteUser();
  if (response) {
    showToast("User deleted successfully", "success");
    logout(); // Log out after successful deletion
    return true;
  } else {
    showToast("Failed to delete user", "error");
    console.error("Error deleting user");
    return false;
  }
};
