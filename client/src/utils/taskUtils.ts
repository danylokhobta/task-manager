'use client';
import { TaskDTO } from "@/schemas/task";
import {
  fetchTasks as apiFetchTasks,
  deleteTask as apiDeleteTask,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask
} from "../api/tasks";
import { store } from "@/store";
import { taskActions } from "@/store/tasksSlice";
import { TaskUploadDTO } from "@/schemas/task/task.requests";


export const getAllTasks = async () => {
  store.dispatch(taskActions.setIsLoading());
  try {
    const tasks = await apiFetchTasks();
    store.dispatch(taskActions.setTasks(tasks));
  } catch (err) {
    store.dispatch(taskActions.setError(`Error fetching tasks: ${err}`));
  }
};

export const updateTask = async (taskId: number, updatedTask: Partial<TaskDTO>) => {
  store.dispatch(taskActions.setIsLoading());
  try {
    const response = await apiUpdateTask(taskId, updatedTask);
    store.dispatch(taskActions.updateTask(response));
  } catch (err) {
    store.dispatch(taskActions.setError(`Error updating task: ${err}`));
  }
};

export const createLocalTask = () => {
  const now = new Date().toISOString();
  const randomId = crypto.randomUUID();
  const newTask = {
    title: '',
    description: '',
    isDone: false,
    createdAt: now,
    id: randomId
  };
  store.dispatch(taskActions.addTask(newTask));
};

export const uploadLocalTask = async (data: TaskUploadDTO) => {
  store.dispatch(taskActions.setIsLoading());
  try {
    const response = await apiCreateTask({
      title: data.title,
      description: data.description,
      isDone: data.isDone
    });
    deleteLocalTask(data.id);
    store.dispatch(taskActions.addTask(response));
  } catch (err) {
    store.dispatch(taskActions.setError(`Error creating task: ${err}`));
  }
};

export const deleteLocalTask = (taskId: number) => {
  store.dispatch(taskActions.deleteTask(taskId));
};

export const deleteTask = async (taskId: number) => {
  store.dispatch(taskActions.setIsLoading());
  try {
    await apiDeleteTask(taskId);
    deleteLocalTask(taskId);
  } catch (err) {
    store.dispatch(taskActions.setError(`Error deleting task: ${err}`));
  }
};