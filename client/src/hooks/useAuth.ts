'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { signin, signout, signup } from "@utils/authUtils";
import { SigninRequestDTO, SignupRequestDTO } from "@/schemas/auth";

const useGlobal = () => {
  const authSlice = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  
  const handleSignin = async (data: SigninRequestDTO) => {
    try {
      await signin(data);
      router.push('/tasks');
    } catch(err) {
      throw err;
    }
  }

  const handleSignup = async (data: SignupRequestDTO) => {
    try {
      await signup(data);
      router.push('/tasks');
    } catch(err) {
      throw err;
    }
  }

  const handleSignout = () => {
    try {
      signout();
      router.push('/auth/signin');
    } catch(err) {
      throw err;
    }
  }

  return {
    ...authSlice,
    handleSignin,
    handleSignup,
    handleSignout,
  };
};

export default useGlobal;