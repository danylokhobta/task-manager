import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModel, AuthGuard],
})
export class UserModule {}
