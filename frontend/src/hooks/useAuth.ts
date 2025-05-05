import { useDispatch } from "react-redux";
import { setAccessToken, setIsAuthenticated } from "../store/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  return {
    setAccessToken: (token: string) => dispatch(setAccessToken(token)),
    setIsAuthenticated: (status: boolean) => dispatch(setIsAuthenticated(status)),
  };
};

export default useAuth;