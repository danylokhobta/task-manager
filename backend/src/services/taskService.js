import {
  getTasksModel,
  getTaskModel,
  createTaskModel,
  updateTaskModel,
  deleteTaskModel
} from '../models/taskModel.js';
import CustomError from '../utils/customError.js';

// Fetch all tasks for the authenticated user
export const getTasksService = async (userId) => {
  const tasks = await getTasksModel(userId);
  return tasks;
};

// Create a new task (protected)
export const createTaskService = async (data) => {
  const newTask = await createTaskModel(data);
  return newTask;
};

// Update a task (protected)
export const updateTaskService = async ({taskId, userId, title, description, is_done}) => {
  const task = await getTaskModel(taskId);
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

  const updatedTask = await updateTaskModel({taskId, userId, title: updatedTitle, description: updatedDescription, is_done: updatedIsDone});
  return updatedTask;
};

// Delete a task (protected)
export const deleteTaskService = async (taskId, userId) => {
  const task = await getTaskModel(taskId);
  if (!task) {
    throw new CustomError("Task not found", 404);
  }
  if (task.user_id !== userId) {
    throw new CustomError("Unauthorized to delete this task",403);
  }
  
  await deleteTaskModel(taskId);
};