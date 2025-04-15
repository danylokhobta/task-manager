import { useEffect } from "react";
import {
  fetchTasks as apiFetchTasks,
  deleteTask as apiDeleteTask,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask
} from "../api/tasks";
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskSortOrder } from "types/tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useGlobal from "./useGlobal";
import { setTasks, deleteTask, updateTask, addTask, setSort } from "../store/tasksSlice";

const useTask = () => {
  const { isAuthenticated } = useGlobal();
  const taskSliceProps = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  // Fetch tasks on mount
  useEffect(() => {
    const handleFetchTasks = async () => {
      if (isAuthenticated) {
        try {
          const tasks = await apiFetchTasks();
          dispatch(setTasks(Array.isArray(tasks) ? tasks : []));
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    handleFetchTasks();
  }, []);

  const handleCreateTask = async ({ title = '', description = '', is_done = false }: CreateTaskRequest) => {
    try {
      const response:Task | null = await apiCreateTask({ title, description, is_done });
      if (response && response.id) {
        dispatch(addTask(response));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (taskId: Task["id"], updatedTask: UpdateTaskRequest) => {
    try {
      const response = await apiUpdateTask(taskId, updatedTask);
      dispatch(updateTask(response));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: Task["id"]) => {
    try {
      await apiDeleteTask(taskId);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return {
    ...taskSliceProps,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    setSort: (order: TaskSortOrder) => dispatch(setSort(order)), // Function to update sort order
  };
};

export default useTask;