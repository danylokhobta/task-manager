import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAccessToken, setIsAuthenticated, resetCookie } from "../store/authSlice";
import { setUser } from "../store/userSlice";
import { AccessToken } from "types/user";
import { getUserByToken } from "../api/user";

const useGlobal = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: RootState) => state.global);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authSlice.accessToken === null) return;
  
        const response = await getUserByToken(authSlice.accessToken);
  
        if (response && response !== null) {
          dispatch(setUser(response.user));
          dispatch(setAccessToken(response.accessToken));
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    if (authSlice.isAuthenticated && (authSlice.accessToken !== null || authSlice.accessToken !== "")) {
      fetchUser();
    }
  }, [authSlice.accessToken]);

  return {
    ...authSlice,
    setAccessToken: (token: AccessToken) => dispatch(setAccessToken(token)),
    setIsAuthenticated: (status: boolean) => dispatch(setIsAuthenticated(status)),
    resetCookie: () => dispatch(resetCookie()),
  };
};

export default useGlobal;