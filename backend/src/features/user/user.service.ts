import { Injectable, Inject } from '@nestjs/common';
import { UserModel } from './user.model';
import { CustomError, checkPassword, generateAccessToken, generateRefreshToken, hashText } from '@/utils';

@Injectable()
export class UserService {
  constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

  async createUser(email: string, password: string, name: string) {
    if (await this.userModel.getUserByEmail(email)) {
      throw new CustomError("User with this email already exists", 409);
    }

    const hashedPassword = await hashText(password, 10);
    const newUser = await this.userModel.createUser(email, hashedPassword, name);
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    return { newUser, accessToken, refreshToken };
  }

  async getUserByEmail(email: string, password: string) {
    console.log("start service", email, password);
    const user = await this.userModel.getUserByEmail(email);
    if (!user) throw new CustomError("User not found", 404);
    const isValid = await checkPassword(password, user.password);
    if (!isValid) throw new CustomError("Invalid password", 403);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    return { user, accessToken, refreshToken };
  }

  async getUserById(userId: number) {
    const user = await this.userModel.getUserById(userId);
    if (!user) throw new CustomError("User not found", 404);
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    return { user, accessToken, refreshToken };
  }

  async updateUser(userId: number, email: string, password: { old: string, new: string }, name: string) {
    const user = await this.userModel.getUserById(userId);
    if (!user) throw new CustomError("User not found", 404);

    const updatedEmail = email ?? user.email;
    const updatedName = name ?? user.name;
    let updatedPassword = user.password;

    if (password?.old && password?.new) {
      const isCorrect = await checkPassword(password.old, user.password);
      if (!isCorrect) throw new CustomError("Old password is incorrect", 400);
      updatedPassword = await hashText(password.new, 10);
    }

    return this.userModel.updateUser(userId, updatedEmail, updatedPassword, updatedName);
  }

  async deleteUser(userId: number) {
    const user = await this.userModel.getUserById(userId);
    if (!user) throw new CustomError("User not found", 404);
    return this.userModel.deleteUser(userId);
  }
}
