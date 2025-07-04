'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDTO } from "@/schemas/task";
import { LoadStatus } from "@/schemas/global";

type TaskState = {
  tasks: TaskDTO[];
  sort: "asc" | "desc";
  status: LoadStatus;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  sort: "asc",
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = [...action.payload]; // Store raw tasks
      state.status = 'success';
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
      state.status = 'success';
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
      state.status = 'success';
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Filter out task by ID
      state.status = 'success';
    },
    setSort(state, action) {
      state.sort = action.payload; // Update sorting order
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "error";
    },
    setIsLoading(state) {
      state.status = 'loading';
    }
  },
});

export const taskActions = tasksSlice.actions;
export default tasksSlice.reducer;