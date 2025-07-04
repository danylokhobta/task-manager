import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Task } from '@prisma/client';
import { createTaskDto, updateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasksService(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
    });
    return tasks;
  }

  async createTaskService(userId: number, dto: createTaskDto) {
    return await this.prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        isDone: dto.isDone, // default to false if undefined
      },
    });
  }

  async updateTaskService(userId: number, taskId: string, dto: updateTaskDto) {
    const taskIdNum = parseInt(taskId, 10);
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskIdNum,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Unauthorized to update this task');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskIdNum },
      data: {
        title: dto.title,
        description: dto.description,
        isDone: dto.isDone,
      },
    });

    return updatedTask;
  }

  async deleteTaskService(taskId: string, userId: number) {
    const taskIdNum = parseInt(taskId, 10);
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskIdNum,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Unauthorized to update this task');
    }

    await this.prisma.task.delete({
      where: { id: taskIdNum },
    });

    return;
  }
}
