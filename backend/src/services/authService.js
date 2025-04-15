import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByIdModel } from '../models/userModel.js';
import CustomError from '../utils/customError.js';

// Generate access and refresh tokens
export const generateTokensService = (userId) => {
  try {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    next(error);
  }
};

// Refresh access token using refresh token
export const refreshAccessTokenService = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Validate if the user with id from refresh token exists in DB
    const user = await getUserByIdModel(decoded.userId);
    if (user === null) throw new CustomError("User not found", 404);
    
    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
    );

    return newAccessToken;
  } catch (error) {
    next(error);
  }
};

// Service function to verify the old password
export const verifyPasswordService = async (userId, passwordToCheck) => {
  try {
    const user = await getUserByIdModel(userId);
    if (!user) throw new CustomError("User not found", 404);
  
    // Check if the old password matches
    const isPasswordValid = await bcrypt.compare(passwordToCheck, user.password);
    return isPasswordValid; // Password validity true/false
  } catch (error) {
    next(error);
  }
};