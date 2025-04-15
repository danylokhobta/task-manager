import { useEffect, useState, useRef } from "react";
import { login } from '../utils/authUtils'
import PageContainer from "../components/PageContainer";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import { useForm as useFormFramework } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormRef } = useForm();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useFormFramework({
      resolver: zodResolver(validationSchema),
    });
  
    const onSubmit = (data: {email: string; password: string }) => {
      login(data);
    };

  useEffect(() => {
    setFormRef("login", formRef);
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

export default LoginPage;