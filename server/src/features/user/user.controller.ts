import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  Delete,
  // Next,
  // UseGuards,
  // Inject,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from './decorator';
import { UserService } from './user.service';
import { GetUserDto, updateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@GetUser('safeUser') safeUser: GetUserDto) {
    return safeUser;
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  async editUser(@GetUser('id') id: number, @Body() dto: updateUserDto) {
    const updatedUser = await this.userService.update(id, dto);
    return updatedUser;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete')
  async deleteUser(@GetUser('id') id: number) {
    await this.userService.delete(id);
    return;
  }
}
