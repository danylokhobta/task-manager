'use client';
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useFormFramework } from "react-hook-form";
import PageContainer from "@/app/components/PageContainer";
import useAuth from '@/hooks/useAuth'
import useForm from "@/hooks/useForm";
import Input from "@/app/components/Input";
import { signinRequestSchema, SigninRequestDTO } from "@/schemas/auth";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormRef } = useForm();
  const { handleSignin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormFramework({
    resolver: zodResolver(signinRequestSchema),
  });

  const onSubmit = async (data: SigninRequestDTO) => {
    await handleSignin(data);
  };

  useEffect(() => {
    setFormRef("signin", formRef);
  }, [formRef])

  return (
    <PageContainer pageTitle="Login" alignCenter>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
        <Input
          placeholder="Email"
          value={email}
          setValue={setEmail}
          inputFormProps={register("email")}
          error={errors.email && errors.email}
        />
        <Input
          placeholder="Password"
          value={password}
          setValue={setPassword}
          blured
          inputFormProps={register("password")}
          error={errors.password && errors.password}
        />
      </form>
    </PageContainer>
  );
};