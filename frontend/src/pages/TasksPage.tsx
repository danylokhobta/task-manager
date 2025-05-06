import { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import TaskList from "../components/TaskList";
import useTask from "../hooks/useTask";

const TasksPage = () => {
  const { fetchTaskList } = useTask();

  useEffect(() => {
    fetchTaskList();
  }, [])

  return (
    <PageContainer pageTitle="Task List">
      <TaskList undone focusNewTaskInList />
      <TaskList initCollapse done />
    </PageContainer>
  );
};

export default TasksPage;