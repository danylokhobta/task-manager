import { Controller, Post, Put, Delete, Body, Req, Res, Next, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from './user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('get')
  async getUser(@Body() body: { email: string, password: string }, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await this.userService.getUserByEmail(body.email, body.password);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      return res.status(200).json({ user: { id: user.id, email: user.email, name: user.name }, accessToken });
    } catch (error) {
      next(error);
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: CreateUserDto, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { newUser, accessToken, refreshToken } = await this.userService.createUser(body.email, body.password, body.name);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      return res.status(201).json({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, accessToken });
    } catch (error) {
      next(error);
    }
  }

  @Post('getByToken')
  @UseGuards(AuthGuard)
  async getUserByToken(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const userId = req.user.id;
      const { user, accessToken } = await this.userService.getUserById(userId);
      return res.status(200).json({ user: { id: user.id, email: user.email, name: user.name }, accessToken });
    } catch (error) {
      next(error);
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@Req() req: Request, @Body() body: { email: string, password: { old: string, new: string }, name: string }, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const userId = req.user.id;
      const updatedUser = await this.userService.updateUser(userId, body.email, body.password, body.name);
      return res.status(200).json({ user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name } });
    } catch (error) {
      next(error);
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const userId = req.user.id;
      await this.userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}