import { createSlice } from "@reduxjs/toolkit";
import { Task } from "types/tasks";

const initialState = {
  tasks: [] as Task[],
  sort: "asc" as "asc" | "desc" | "", // Sorting order
  isTaskInitCompleted: false as boolean,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = [...action.payload]; // Store raw tasks
      state.isTaskInitCompleted = true;
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Filter out task by ID
    },
    setSort(state, action) {
      state.sort = action.payload; // Update sorting order
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, setSort } = tasksSlice.actions;
export default tasksSlice.reducer;