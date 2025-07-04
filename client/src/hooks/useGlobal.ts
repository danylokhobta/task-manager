'use client';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGlobalStatus } from "@store/globalSlice";
import { LoadStatus } from "@/schemas/global";

const useGlobal = () => {
  const dispatch = useDispatch();
  const globalSlice = useSelector((state: RootState) => state.global);

  return {
    ...globalSlice,
    setGlobalStatus: (status: LoadStatus) => dispatch(setGlobalStatus(status)),
  };
};

export default useGlobal;