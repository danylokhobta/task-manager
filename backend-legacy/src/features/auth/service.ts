import { getUserById } from '@/features/user/service'
import { decodeRefreshToken, generateAccessToken, checkPassword } from '@/utils'

// Refresh access token using refresh token
export const refreshAccessTokenService = async (refreshToken: string) => {
  try {
    const decoded = decodeRefreshToken(refreshToken);

    // Validate if the user with id from refresh token exists in DB
    await getUserById(decoded.userId);
    
    // Generate a new access token
    return generateAccessToken(decoded.userId);
  } catch (error) {
    throw error;
  }
};

// Service function to verify the old password
export const verifyPasswordService = async (userId: number, passwordToCheck: string) => {
  try {
    const { user } = await getUserById(userId);
    return checkPassword(passwordToCheck, user.password); // Password validity true/false
  } catch (error) {
    throw error;
  }
};