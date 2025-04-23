import { checkPassword, generateAccessToken, generateRefreshToken } from '@/utils';
import {
  getUserByEmailModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  deleteUserModel
} from './model';
import { CustomError } from '@/utils';
import { hashText } from '@/utils';

// Create user
export const createUser = async (email: string, password: string, name: string) => {
  try {
    if (await getUserByEmailModel(email) !== null) {
      throw new CustomError("Can't create a new user because user with such email already exists", 409);
    }
  
    const hashedPassword = await hashText(password, 10);
    const newUser = await createUserModel(email, hashedPassword, name);  // Use the model function
  
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);
  
    return { newUser, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

// Get user by email and authenticate password
export const getUserByEmail = async (email: string, password: string) => {
  try {
    const user = await getUserByEmailModel(email);
  
    if(user === null) {
      throw new CustomError("User not found", 404);
    }
  
    const isPasswordValid = await checkPassword(password, user.password); // Await the Promise
    if (!isPasswordValid) {
      throw new CustomError("Invalid password", 403);
    }
  
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
  
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw error;    
  }
};

// Get user by userId
export const getUserById = async (userId: number) => {
  try {
    const user = await getUserByIdModel(userId);
  
    if(user === null) {
      throw new CustomError("User not found", 404);
    }
  
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
  
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw error;    
  }
};

// Update user data
export const updateUser = async (userId: number, email: string, password: {old: string, new: string}, name: string) => {
  try {
    const user = await getUserByIdModel(userId);
  
    if(user === null) {
      throw new CustomError("User not found", 404);
    }
    // Use existing data if not provided
    const updatedEmail = email !== undefined ? email : user.email;
    const updatedName = name !== undefined ? name : user.name;
    let updatedPassword = user.password;
  
    // If password object is provided, verify old password and update with new password
    if (password && password.old && password.new) {
      if (!checkPassword(password.old, user.password)) {
        throw new CustomError(`Old password is incorrect`, 400);
      }
      updatedPassword = await hashText(password.new, 10);
    }
  
    // Update user in the database
    const updatedUser = updateUserModel(userId, updatedEmail, updatedPassword, updatedName)
    return updatedUser;
  } catch (error) {
    throw error;    
  }
};

// Delete user account
export const deleteUser = async (userId: number) => {
  try {
    if((await getUserByIdModel(userId)) === null) {
      throw new CustomError("User not found", 404);
    }
  
    await deleteUserModel(userId);
    return;
  } catch (error) {
    throw error;    
  }
};