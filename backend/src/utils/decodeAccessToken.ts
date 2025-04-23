import jwt from 'jsonwebtoken';

export const decodeAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error; // Re-throw to handle it in middleware
  }
};