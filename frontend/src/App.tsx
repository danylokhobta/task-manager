import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import TasksPage from "./pages/TasksPage";
import EditTaskPage from "./pages/EditTaskPage";
import useGlobal from "./hooks/useGlobal";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

function App() {
  const { isAuthenticated } = useGlobal();

  return (
    <div className="pl-5 pr-2 pt-5 box-border flex flex-col gap-5 h-screen max-w-xl mx-auto">
      <Toast />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/user" /> : <WelcomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/user" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/user" /> : <RegisterPage />} />
        <Route path="/user" element={isAuthenticated ? <UserPage /> : <Navigate to="/" />} />
        <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/" />} />
        <Route path="/tasks/:taskId/edit" element={isAuthenticated ? <EditTaskPage /> : <Navigate to="/" />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Navbar />
    </div>
  );
};

export default App;