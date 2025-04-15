import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser, removeUser } from "../store/userSlice";
import { User } from "types/user";

const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  return {
    ...userState,
    setUser: (user: User) => dispatch(setUser(user)),
    removeUser: () => dispatch(removeUser()),
  };
};

export default useUser;