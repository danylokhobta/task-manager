import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService
} from '../services/taskService.js';

export const getTasksController = async (req, res, next) => {
  const userId = req.user.userId;
  
  try {
    const tasks = await getTasksService(userId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTaskController = async (req, res, next) => {
  const userId = req.user.userId;
  const { title, description } = req.body;

  try {
    const newTask = await createTaskService({userId, title, description});
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  const { title, description, is_done } = req.body;
  const { taskId } = req.params;
  const userId = req.user.userId;

  try {
    const updatedTask = await updateTaskService({taskId, userId, title, description, is_done});
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user.userId;

  try {
    await deleteTaskService(taskId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};