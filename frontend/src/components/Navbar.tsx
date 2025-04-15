import { useLocation, matchPath } from "react-router-dom";
import Button from "./Button";
import useTask from "../hooks/useTask";
import { logout } from "../utils/authUtils";
import { deleteUser } from "../utils/userUtils";
import { useForm } from "../hooks/useForm";
import Loader from "./Loader";

// fixed bottom-5 left-5 right-5

const Navbar = () => {
  const location = useLocation();
  const { handleCreateTask } = useTask();
  const { submitForm } = useForm();

  const isWelcomePage = matchPath("/", location.pathname);
  const isLoginPage = matchPath("/login", location.pathname);
  const isRegisterPage = matchPath("/register", location.pathname);
  const isTasksPage = matchPath("/tasks/*", location.pathname); // Matches /tasks and /tasks/:id
  const isUserPage = matchPath("/user/*", location.pathname); // Matches /user and /user/:id

  return (
    <nav className="absolute bottom-5 self-center backdrop-blur-sm mr-3">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-10"></div>
      <div className="relative p-2.5 z-20 flex justify-center gap-2.5">
        <Loader />
        {isLoginPage && (
          <>
            <Button label="Back" link="/" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Login" onClick={() => submitForm("login")} />
          </>
        )}
        {isRegisterPage && (
          <>
            <Button label="Back" link="/" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Register" onClick={() => submitForm("register")} />
          </>
        )}
        {isWelcomePage && (
          <>
            <Button label="Register" link="/register" />
            <Button label="Login" link="/login" />
          </>
        )}
        {isTasksPage && (
          <>
            <Button label="Account" link="/user" />
            <div className="w-0.5 bg-gray-300" />
            <Button 
              label="Add new task" 
              onClick={() => handleCreateTask({ title: "", description: "", is_done: false })} 
            />
          </>
        )}
        {isUserPage && (
          <>
            <Button label="Task list" link="/tasks" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Update account data" onClick={() => submitForm("update-user")} />
            <Button label="Logout" onClick={logout} />
            <Button label="Delete user" onClick={deleteUser} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;