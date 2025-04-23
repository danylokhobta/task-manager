import { Injectable } from '@nestjs/common';
import { getUserById } from '@/features/user/service'
import { decodeRefreshToken, generateAccessToken, checkPassword } from '@/utils'

@Injectable()
export class AuthService {
  async refreshAccessTokenService(refreshToken: string) {
    try {
      const decoded = decodeRefreshToken(refreshToken);
  
      // Validate if the user with id from refresh token exists in DB
      await getUserById(decoded.userId);
      
      // Generate a new access token
      return generateAccessToken(decoded.userId);
    } catch (error) {
      throw error;
    }
  }

  async verifyPasswordService(userId: number, passwordToCheck: string) {
    try {
      const { user } = await getUserById(userId);
      return checkPassword(passwordToCheck, user.password); // Password validity true/false
    } catch (error) {
      throw error;
    }
  }
}
