'use client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { userActions } from "../store/userSlice";
import { UserDTO } from "@/schemas/user";
import { getMe, updateUser, deleteUser } from "@/utils/userUtils";

const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleDeleteUser = () => {
    try {
      deleteUser();
      router.push('/');
    } catch(err) {
      throw err;
    }
  }

  return {
    ...userState,
    getMe,
    updateUser,
    setUser: (user: UserDTO) => dispatch(userActions.setUser(user)),
    handleDeleteUser,
  };
};

export default useUser;