export type Message = string | undefined;
export type Title = string | undefined;
export type Description = string | undefined;
export type Done = boolean | undefined;
export type TaskSortOrder = "" | "asc" | "desc";

export interface Task {
  id: number;
  user_id: number;
  title: Title;
  description: Description;
  is_done: Done;
  created_at: string;
  updated_at?: string;
}

// Request Types
export interface CreateTaskRequest {
  title: Title;
  description: Description;
  is_done: Done;
}

export interface UpdateTaskRequest {
  title?: Title;
  description?: Description;
  is_done?: Done;
}

// Response Types
