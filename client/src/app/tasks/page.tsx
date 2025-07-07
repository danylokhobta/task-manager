'use client';
import { useEffect } from "react";
import PageContainer from "@/app/components/PageContainer";
import TaskList from "@/app/components/TaskList";
import useTask from "@/hooks/useTask";

const TasksPage = () => {
  const { tasks, status, getAllTasks } = useTask();

  useEffect(() => {
    if (status === 'idle') {
      getAllTasks();
    }
  }, [status]);

  return (
    <PageContainer pageTitle="Task List">
      <TaskList tasks={tasks} undone focusNewTaskInList />
      <TaskList tasks={tasks} initCollapse done />
    </PageContainer>
  );
};

export default TasksPage;