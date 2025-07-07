import api from "./client";
import { TaskDTO, allTasksSchema, taskSchema } from "@/schemas/task";
import API_CONFIG from "./config";

// Fetch all tasks
export const fetchTasks = async (): Promise<TaskDTO[]> => {
  try {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.TASK}/all`);
    const parsed = allTasksSchema.parse(response.data);
    return parsed;
  } catch (err) {
    throw err;
  }
};

// Create a new task
export const createTask = async (taskData: Partial<TaskDTO>): Promise<TaskDTO> => {
  try {
    const response = await api.post(`${API_CONFIG.ENDPOINTS.TASK}/create`, taskData);
    const parsed = taskSchema.parse(response.data);
    return parsed;
  } catch (err) {
    throw err;
  }
};

// Update an existing task
export const updateTask = async (taskId: number, taskData: Partial<TaskDTO>): Promise<TaskDTO> => {
  try {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.TASK}/${taskId}`, taskData);
    const parsed = taskSchema.parse(response.data);
    return parsed;
  } catch (err) {
    throw err;
  }
};

// Delete a task
export const deleteTask = async (taskId: number) => {
  try {
    await api.delete(`${API_CONFIG.ENDPOINTS.TASK}/${taskId}`);
  } catch (err) {
    throw err;
  }
};