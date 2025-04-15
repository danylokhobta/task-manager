import bcrypt from 'bcryptjs';
import { generateTokensService } from './authService.js';
import {
  getUserByEmailModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  deleteUserModel
} from '../models/userModel.js';
import CustomError from '../utils/customError.js';

// Create user
export const createUserService = async (email, password, name) => {
  if (await getUserByEmailModel(email) !== null) {
    throw new CustomError("Can't create a new user because user with such email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUserModel(email, hashedPassword, name);  // Use the model function

  const { accessToken, refreshToken } = generateTokensService(newUser.id);

  return { newUser, accessToken, refreshToken };
};

// Get user by email and authenticate password
export const getUserService = async (email, password) => {
  const user = await getUserByEmailModel(email);

  if(user === null) {
    throw new CustomError("User not found", 404);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid password", 403);
  }

  const { accessToken, refreshToken } = generateTokensService(user.id);

  return { user, accessToken, refreshToken };
};

// Get user by userId
export const getUserByIdService = async (userId) => {
  const user = await getUserByIdModel(userId);

  if(user === null) {
    throw new CustomError("User not found", 404);
  }

  const { accessToken, refreshToken } = generateTokensService(user.id);

  return { user, accessToken, refreshToken };
};

// Update user data
export const updateUserService = async (userId, email, password, name) => {
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
    if (!(await bcrypt.compare(password.old, user.password))) {
      throw new CustomError(`Old password is incorrect`, 400);
    }    

    const hashedPassword = await bcrypt.hash(password.new, 10);
    updatedPassword = hashedPassword;
  }

  // Update user in the database
  const updatedUser = updateUserModel(userId, updatedEmail, updatedPassword, updatedName)
  return updatedUser;
};

// Delete user account
export const deleteUserService = async (userId) => {
  if((await getUserByIdModel(userId)) === null) {
    throw new CustomError("User not found", 404);
  }

  await deleteUserModel(userId);
  return;
};