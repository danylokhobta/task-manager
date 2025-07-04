'use client';
import { useState, useRef, useEffect } from "react";
import useUser from "@hooks/useUser";
import PageContainer from "@components/PageContainer";
import Input from "@components/Input";
import useForm from "@hooks/useForm";
import { useForm as useFormFramework } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  newName: z.string().min(1, { message: "Name is required" }),
  newEmail: z.string().email({ message: "Invalid email" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function UserPage() {
  const { user, getMe, updateUser } = useUser();

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormRef } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormFramework({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: { newName: string; newEmail: string; newPassword: string }) => {
    await updateUser({ email: data.newEmail, password: data.newPassword, name: data.newName });
    setNewPassword("");
  };

  useEffect(() => {
    setFormRef("update-user", formRef);
  }, [formRef])

  useEffect(() => {
    getMe();
  }, [])

  return (
    <PageContainer pageTitle="Account" alignCenter>
      {
        user &&
        <>
          <h2 className="font-bold text-3xl mb-7.5">Welcome, {user.name}!</h2>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
            <Input
              placeholder="New Name"
              value={newName}
              setValue={setNewName}
              inputFormProps={register("newName")}
              error={errors.newName && errors.newName}
            />
            <Input
              placeholder="New Email"
              value={newEmail}
              setValue={setNewEmail}
              inputFormProps={register("newEmail")}
              error={errors.newEmail && errors.newEmail}
            />
            <Input
              placeholder="New Password"
              value={newPassword}
              setValue={setNewPassword}
              blured
              inputFormProps={register("newPassword")}
              error={errors.newPassword && errors.newPassword}
            />
          </form>
        </>
      }
    </PageContainer>
  );
};