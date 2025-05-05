import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetCookie } from "../store/authSlice";

const useGlobal = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state: RootState) => state.global);

  return {
    ...authSlice,
    resetCookie: () => dispatch(resetCookie()),
  };
};

export default useGlobal;