import { refreshAccessTokenService, verifyPasswordService } from '../services/authService.js';
import CustomError from '../utils/customError.js';

export const refreshAccessTokenController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new CustomError("Refresh token missing", 401);

  try {
    const newAccessToken = await refreshAccessTokenService(refreshToken);
    res.status(201).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const verifyPasswordController = async (req, res, next) => {
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