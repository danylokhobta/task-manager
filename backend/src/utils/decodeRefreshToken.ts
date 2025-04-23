import jwt from 'jsonwebtoken';

export const decodeRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error; // Re-throw to handle it in middleware
  }
};