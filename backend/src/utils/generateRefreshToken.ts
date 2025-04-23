import jwt from 'jsonwebtoken';

export const generateRefreshToken = (userId: number) => {
  // @ts-ignore
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION as string }
  );
}