import api from "./client";
import {
  userSchema,
  UserDTO,
  UserUpdateDTO,
} from "@schemas/user";
import API_CONFIG from "./config";

// Get user by token (refetch)
export const getMe = async (): Promise<UserDTO> => {
  try {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.USER}/me`);
    const parsed = userSchema.parse(response.data);
    return parsed;
  } catch (err) {
    throw err;
  }
};

// Update user details
export const updateUser = async (userData: Partial<UserUpdateDTO>): Promise<UserDTO> => {
  try {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.USER}/update`, userData);
    const parsed = userSchema.parse(response.data);
    return parsed;
  } catch(err) {
    throw err;
  }
};

// Delete user account
export const deleteUser = async () => {
  try {
    await api.delete(`${API_CONFIG.ENDPOINTS.USER}/delete`);
  } catch(err) {
    throw err;
  }
};