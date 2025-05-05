export type Message = string | undefined;
export type Title = string | undefined;
export type Description = string | undefined;
export type Done = boolean | undefined;
export type TaskSortOrder = "" | "asc" | "desc";

export interface Task {
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  id: number;

  userId?: number;
  updatedA?: string;
}

// Request Types
export interface CreateTaskRequest {
  title?: string;
  description?: string;
  isDone?: boolean;
  id?: number
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isDone?: boolean;
}

// Response Types
