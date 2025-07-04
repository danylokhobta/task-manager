import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { generateHash } from 'src/utils';
import { updateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, dto: updateUserDto) {
    const data: any = { ...dto };

    if (dto.password) {
      data.hash = await generateHash(dto.password);
      delete data.password;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async delete(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });

    return;
  }
}
