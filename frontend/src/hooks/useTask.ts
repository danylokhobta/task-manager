import {
  fetchTasks as apiFetchTasks,
  deleteTask as apiDeleteTask,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask
} from "../api/tasks";
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskSortOrder } from "types/tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setTasks, deleteTask, updateTask, addTask, setSort } from "../store/tasksSlice";

const useTask = () => {
  const taskSliceProps = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const fetchTaskList = async () => {
    try {
      const tasks = await apiFetchTasks();
      dispatch(setTasks(Array.isArray(tasks) ? tasks : []));
      console.log(tasks)
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createLocalTask = () => {
    const now = new Date().toISOString();
    const randomId = crypto.randomUUID();
    const newTask = {
      title: '',
      description: '',
      isDone: false,
      createdAt: now,
      id: randomId
    };
    dispatch(addTask(newTask));
  };

  const uploadTask = async (data: CreateTaskRequest) => {
    try {
      const response:Task | null = await apiCreateTask({
        title: data.title,
        description: data.description,
        isDone: data.isDone
      });
      if (response && response.id) {
        dispatch(deleteTask(data.id))
        dispatch(addTask(response));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (taskId: number, updatedTask: UpdateTaskRequest) => {
    try {
      await apiUpdateTask(taskId, updatedTask);
      dispatch(updateTask({id: taskId, ...updatedTask}));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteLocalTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await apiDeleteTask(taskId);
      deleteLocalTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return {
    ...taskSliceProps,
    fetchTaskList,
    uploadTask,
    createLocalTask,
    handleUpdateTask,
    handleDeleteTask,
    deleteLocalTask,
    setSort: (order: TaskSortOrder) => dispatch(setSort(order)), // Function to update sort order
  };
};

export default useTask;