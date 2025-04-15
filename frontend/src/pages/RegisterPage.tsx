import { useEffect, useState, useRef } from "react";
import { register as registerUtil } from '../utils/authUtils'
import PageContainer from "../components/PageContainer";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import { useForm as useFormFramework } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormRef } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormFramework({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = (data: { name: string; email: string; password: string }) => {
    registerUtil(data);
  };

  useEffect(() => {
    setFormRef("register", formRef);
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

export default RegisterPage;