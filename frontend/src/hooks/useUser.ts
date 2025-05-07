import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser, removeUser, setUserIsLoading } from "../store/userSlice";
import { User } from "types/user";
import { getMe } from "../api/user";

const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const fetchUser = async () => {
    setUserIsLoading();
    try {
      if (!sessionStorage.getItem('access_token')) throw Error('Access Token Not Found');

      const response = await getMe();

      if (response !== null) {
        dispatch(setUser({email: response.email, name: response.name}));
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