import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class updateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;
}

// Create SafeUserDto by excluding `hash` from the User model
export type GetUserDto = Omit<User, 'hash'>;
