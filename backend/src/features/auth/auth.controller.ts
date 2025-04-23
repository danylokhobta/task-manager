import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    const { refreshToken } = req.cookies; // Assuming refresh token is in cookies
    return this.AuthService.refreshAccessTokenService(refreshToken);
  }

  @Post('verify-password')
  @UseGuards(AuthGuard)
  async verifyPassword(@Req() req: Request, @Body() body: { password: string }) {
    const userId = req.user.id;
    return this.AuthService.verifyPasswordService(userId, body.password);
  }
}
