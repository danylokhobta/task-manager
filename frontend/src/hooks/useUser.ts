import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser, removeUser, setUserIsLoading } from "../store/userSlice";
import { setAccessToken } from "../store/authSlice";
import { User } from "types/user";
import { getMe } from "../api/user";

const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const authSlice = useSelector((state: RootState) => state.auth);

  const fetchUser = async () => {
    setUserIsLoading();
    try {
      if (authSlice.accessToken === null) return false;

      const response = await getMe();

      if (response !== null) {
        dispatch(setUser({email: response.email, name: response.name}));
        dispatch(setAccessToken(response.access_token));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  }

  return {
    ...userState,
    fetchUser,
    setUser: (user: User) => dispatch(setUser(user)),
    removeUser: () => dispatch(removeUser()),
  };
};

export default useUser;