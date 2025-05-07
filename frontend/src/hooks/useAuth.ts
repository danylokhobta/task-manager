import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../store/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  return {
    setIsAuthenticated: (status: boolean) => dispatch(setIsAuthenticated(status)),
  };
};

export default useAuth;