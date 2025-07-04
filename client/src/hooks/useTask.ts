'use client';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { taskActions } from "../store/tasksSlice";
import { createLocalTask, deleteLocalTask, deleteTask, getAllTasks, updateTask, uploadLocalTask } from "@/utils/taskUtils";

const useTask = () => {
  const taskSliceProps = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  return {
    ...taskSliceProps,
    getAllTasks,
    updateTask,
    createLocalTask,
    uploadLocalTask,
    deleteLocalTask,
    deleteTask,
    setSort: (order: 'asc' | 'desc') => dispatch(taskActions.setSort(order)), // Function to update sort order
  };
};

export default useTask;