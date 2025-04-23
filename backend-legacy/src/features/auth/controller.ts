import { Request, Response, NextFunction } from 'express';
import { refreshAccessTokenService, verifyPasswordService } from './service';
import { CustomError } from '@/utils';

export const refreshAccessToken = async (req:Request, res:Response, next:NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new CustomError("Refresh token missing", 401);

  try {
    const newAccessToken = await refreshAccessTokenService(refreshToken);
    res.status(201).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const verifyPassword = async (req:Request, res:Response, next:NextFunction) => {
  const userId = req.user.userId;
  const passwordToCheck = req.body.password;
  if (!passwordToCheck) throw new CustomError("Password is missing", 400);

  try {
    const isPasswordValid = await verifyPasswordService(userId, passwordToCheck);
    res.status(201).json({ isPasswordValid });
  } catch (error) {
    next(error);
  }
};