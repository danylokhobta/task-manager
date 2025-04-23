import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: number) => {
  // @ts-ignore
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as string}
  );
}