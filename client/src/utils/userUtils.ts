'use client';
import { getMe as getMeAPI, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from "../api/user";
import { UserUpdateDTO } from "@/schemas/user";
import { store } from "@/store";
import { userActions } from "@/store/userSlice";
import { resetCookies } from "@/utils/authUtils";

// Function to handle user update
export const getMe = async () => {
  store.dispatch(userActions.setIsLoading());
  try {
    const user = await getMeAPI();
    store.dispatch(userActions.setUser(user));
  } catch(err) {
    store.dispatch(userActions.setError(`Error fetching user: ${err}`));
    console.error("Error fetching user", err);
    throw err;
  }
};

// Function to handle user update
export const updateUser = async (userData: UserUpdateDTO) => {
  store.dispatch(userActions.setIsLoading());
  try {
    const updatedUser = await apiUpdateUser(userData);
    store.dispatch(userActions.setUser(updatedUser));
  } catch(err) {
    store.dispatch(userActions.setError(`Error updating user: ${err}`));
    console.error("Error updating user", err);
    throw err;
  }
};

// Function to handle user deletion
export const deleteUser = async () => {
  try {
    await apiDeleteUser();
    store.dispatch(userActions.removeUser());
    resetCookies();
  } catch(err) {
    store.dispatch(userActions.setError(`Error deleting user: ${err}`));
    console.error("Error deleting user", err);
    throw err;
  }
};