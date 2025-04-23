import { Request, Response, NextFunction } from 'express';
import {
  createUser as createUserService,
  getUserByEmail,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService
} from './service';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  try {
    const { newUser, accessToken, refreshToken } = await createUserService(email, password, name);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(201).json({
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const { user, accessToken, refreshToken } = await getUserByEmail(email, password);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;
  try {
    const { user, accessToken } = await getUserByIdService(userId);
    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;
  const { email, password, name } = req.body;
  try {
    const updatedUser = await updateUserService(userId, email, password, name);
    res.status(200).json({
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;
  try {
    await deleteUserService(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};