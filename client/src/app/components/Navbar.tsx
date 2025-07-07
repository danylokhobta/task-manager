'use client';
import { usePathname } from 'next/navigation';
import Button from "./Button";
import useTask from "@/hooks/useTask";
import useAuth from "@/hooks/useAuth";
import useUser from '@/hooks/useUser';
import useForm from "@/hooks/useForm";
import Loader from "./Loader";

// fixed bottom-5 left-5 right-5

const Navbar = () => {
  const { createLocalTask } = useTask();
  const { submitForm } = useForm();
  const { handleSignout } = useAuth();
  const { handleDeleteUser } = useUser();

  const pathname = usePathname();

  const isWelcomePage = pathname === '/';
  const isLoginPage = pathname === '/auth/signin';
  const isRegisterPage = pathname === '/auth/signup';
  const isTasksPage = pathname.startsWith('/tasks');
  const isUserPage = pathname.startsWith('/user');

  return (
    <nav className="absolute bottom-5 self-center backdrop-blur-sm mr-3 z-10">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-10"></div>
      <div className="relative p-2.5 z-20 flex justify-center gap-2.5">
        <Loader />
        {isLoginPage && (
          <>
            <Button label="Back" link="/" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Login" onClick={() => submitForm("signin")} />
          </>
        )}
        {isRegisterPage && (
          <>
            <Button label="Back" link="/" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Register" onClick={() => submitForm("signup")} />
          </>
        )}
        {isWelcomePage && (
          <>
            <Button label="Sign Up" link="/auth/signup" />
            <Button label="Sign In" link="/auth/signin" />
          </>
        )}
        {isTasksPage && (
          <>
            <Button label="Account" link="/user" />
            <div className="w-0.5 bg-gray-300" />
            <Button 
              label="Add new task" 
              onClick={() => createLocalTask()} 
            />
          </>
        )}
        {isUserPage && (
          <>
            <Button label="Task list" link="/tasks" />
            <div className="w-0.5 bg-gray-300" />
            <Button label="Update account data" onClick={() => submitForm("update-user")} />
            <Button label="Logout" onClick={handleSignout} />
            <Button label="Delete user" onClick={handleDeleteUser} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;