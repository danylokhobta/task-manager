import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { verifyHash, generateHash } from '../../utils';
import { PrismaService } from '../prisma/prisma.service';
import { signUpDto, signInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: signUpDto) {
    try {
      const hash = await generateHash(dto.password);
      // create user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
        },
      });

      return this.signToken(user.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: signInDto) {
    // fetch user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    // validate password
    const isValid = await verifyHash(dto.password, user.hash);
    if (!isValid) throw new ForbiddenException('Credentials incorrect');

    const { access_token, refresh_token } = await this.signToken(user.id);

    return { access_token, refresh_token };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const secret = this.config.get('JWT_REFRESH_SECRET');
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: secret,
      });

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (!user) throw new NotFoundException('User not found');

      const { access_token } = await this.signToken(user.id);
      return { access_token };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signToken(userId: number): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const payload = {
      sub: userId,
    };

    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }
}
