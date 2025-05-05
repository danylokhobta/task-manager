import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { AppController } from './app.controller';
import { PrismaModule } from './features/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { TaskModule } from './features/task/task.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    PrismaModule,
  ],
})
export class AppModule {}
