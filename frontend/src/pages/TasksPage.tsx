import PageContainer from "../components/PageContainer";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  return (
    <PageContainer pageTitle="Task List">
      <TaskList undone focusNewTaskInList />
      <TaskList initCollapse done />
    </PageContainer>
  );
};

export default TasksPage;