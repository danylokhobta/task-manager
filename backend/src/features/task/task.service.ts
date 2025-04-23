import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';
import { CustomError } from '@/utils';

@Injectable()
export class TaskService {
  constructor(private TaskModel: TaskModel) {}

  async getTasksService(userId: number) {
    const tasks = await this.TaskModel.getTasksModel(userId);
    return tasks;
  }

  async createTaskService(data: { userId: number, title: string, description: string}) {
    const newTask = await this.TaskModel.createTaskModel(data);
    return newTask;
  }

  async updateTaskService(
    {taskId, userId, title, description, is_done}: 
    {taskId: string, userId: number, title: string, description: string, is_done: boolean}
  ) {
    const task = await this.TaskModel.getTaskModel(taskId);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    if (task.user_id !== userId) {
      throw new CustomError("Unauthorized to update this task", 403);
    }
  
    // Use existing data if not provided
    const updatedTitle = title !== undefined ? title : task.title;
    const updatedDescription = description !== undefined ? description : task.description;
    const updatedIsDone = is_done !== undefined ? is_done : task.is_done;
  
    const updatedTask = await this.TaskModel.updateTaskModel({taskId, userId, title: updatedTitle, description: updatedDescription, is_done: updatedIsDone});
    return updatedTask;
  };

  async deleteTaskService(taskId: string, userId:number) {
    const task = await this.TaskModel.getTaskModel(taskId);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    if (task.user_id !== userId) {
      throw new CustomError("Unauthorized to delete this task",403);
    }
    
    await this.TaskModel.deleteTaskModel(taskId);
  }
}
