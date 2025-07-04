'use client';
import { useEffect, useState, useRef } from "react";
import { useForm as useFormFramework } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from '@hooks/useAuth';
import useForm from "@hooks/useForm";
import PageContainer from "@components/PageContainer";
import Input from "@components/Input";
import { SignupRequestDTO, signupRequestSchema } from "@schemas/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormRef } = useForm();
  const { handleSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormFramework({
    resolver: zodResolver(signupRequestSchema),
  });
  
  const onSubmit = async (data: SignupRequestDTO) => {
    await handleSignup(data);
  };

  useEffect(() => {
    setFormRef("signup", formRef);
  }, [formRef])

  return (
    <PageContainer pageTitle="Register" alignCenter>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
        <Input
          placeholder="Name"
          value={name}
          setValue={setName}
          inputFormProps={register("name")}
          error={errors.name && errors.name}
        />
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