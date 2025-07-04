import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../user/decorator';
import { createTaskDto, updateTaskDto } from './dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getTasks(@GetUser('id') userId: number) {
    return this.TaskService.getTasksService(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createTask(@GetUser('id') userId: number, @Body() dto: createTaskDto) {
    return await this.TaskService.createTaskService(userId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @GetUser('id') userId: number,
    @Body() dto: updateTaskDto,
  ) {
    return await this.TaskService.updateTaskService(userId, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async deleteTask(
    @Param('taskId') taskId: string,
    @GetUser('id') userId: number,
  ) {
    await this.TaskService.deleteTaskService(taskId, userId);
    return;
  }
}
