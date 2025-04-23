import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { TaskModule } from './features/task/task.module';
import { PrismaModule } from './features/prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, TaskModule, PrismaModule],
})
export class AppModule {}