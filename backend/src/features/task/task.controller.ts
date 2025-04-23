import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getTasks(@Req() req: Request) {
    const userId = req.user.id;
    return this.TaskService.getTasksService(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTask(@Req() req: Request, @Body() body: { title: string, description: string, is_done: boolean }) {
    const userId = req.user.id;
    return this.TaskService.createTaskService({ userId, ...body });
  }

  @Put(':taskId')
  @UseGuards(AuthGuard)
  async updateTask(@Param('taskId') taskId: string, @Req() req: Request, @Body() body: { title: string, description: string, is_done: boolean }) {
    const userId = req.user.id;
    return this.TaskService.updateTaskService({ taskId, userId, ...body });
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard)
  async deleteTask(@Param('taskId') taskId: string, @Req() req: Request) {
    const userId = req.user.id;
    return this.TaskService.deleteTaskService(taskId, userId);
  }
}
