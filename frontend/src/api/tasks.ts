import { handleApiCall } from "./apiCallHandler";
import api from "./api";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "types/tasks";

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await handleApiCall(api.get<Task[]>("/task"));
  if (response.success) {
    return response.data || []; // Return empty array if no tasks are found
  } else {
    return []; // Return an empty array on failure
  }
};

// Create a new task
export const createTask = async (taskData: CreateTaskRequest): Promise<Task | null> => {
  const response = await handleApiCall(api.post("/task", taskData));
  if (response.success) {
    return response.data || null; // Return null if creation failed unexpectedly
  } else {
    return null; // Return null on failure
  }
};

// Update an existing task
export const updateTask = async (taskId: number, taskData: UpdateTaskRequest): Promise<Task | null> => {
  const response = await handleApiCall(api.put(`/task/${taskId}`, taskData));
  if (response.success) {
    return response.data || null; // Return null if update failed unexpectedly
  } else {
    return null; // Return null on failure
  }
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<boolean> => {
  const response = await handleApiCall(api.delete(`/task/${taskId}`));
  if (response.success) {
    return true; // Successfully deleted the task
  } else {
    return false; // Return false on failure
  }
};