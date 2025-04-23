import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskModel } from './task.model';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskModel, AuthGuard],
})
export class TaskModule {}
