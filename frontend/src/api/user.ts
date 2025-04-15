import { handleApiCall } from "./apiCallHandler";
import api from "./api";
import { 
  GetUserRequest, 
  CreateUserRequest, 
  CreateUserResponse, 
  GetUserResponse, 
  UpdateUserRequest,
  UpdateUserResponse,
  AccessToken
} from "types/user";
import handleError from "../utils/errorHandlerUtil";

// Create a new user
export const createUser = async (userData: CreateUserRequest): Promise<CreateUserResponse | null> => {
  const response = await handleApiCall(api.post("/user/create", userData));
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

// Get user (login)
export const getUser = async (credentials: GetUserRequest): Promise<GetUserResponse | null> => {
  const response = await handleApiCall(api.post("/user/get", credentials));
  if (response.success) {
    return response.data || null;
  } else {
    handleError({
      message: `Error getting user: ${response.message}
    `})
    return null;
  }
};

// Get user by token (refetch)
export const getUserByToken = async (accessToken: AccessToken): Promise<GetUserResponse | null> => {
  const response = await handleApiCall(api.post("/user/getByToken", { accessToken }));
  if (response.success) {
    return response.data;
  } else {
    return null;
  }
};

// Update user details
export const updateUser = async (userData: UpdateUserRequest): Promise<UpdateUserResponse | null> => {
  const response = await handleApiCall(api.put("/user", userData));
  if (response.success) {
    console.log("User updated successfully:", response.data);
    return response.data || null;
  } else {
    handleError({
      message: `Error updating user: ${response.message}
    `})
    return null;
  }
};

// Delete user account
export const deleteUser = async (): Promise<boolean> => {
  const response = await handleApiCall(api.delete("/user"));
  if (response.success) {
    console.log("User deleted successfully");
    return true;
  } else {
    handleError({
      message: `Error deleting user: ${response.message}
    `})
    return false;
  }
};