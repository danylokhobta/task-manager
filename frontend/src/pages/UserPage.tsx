import useUser from "../hooks/useUser";
import { useState, useRef, useEffect } from "react";
import { updateUser } from "../utils/userUtils";
import PageContainer from "../components/PageContainer";
import Input from "../components/Input";
import { useForm } from "../hooks/useForm";
import { useForm as useFormFramework } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  newName: z.string().min(1, { message: "Name is required" }),
  newEmail: z.string().email({ message: "Invalid email" }),
  oldPassword: z.string().min(1, { message: "Password is required" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const UserPage = () => {
  const { name } = useUser();

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
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
  const onSubmit = async (data: { newName: string; newEmail: string; oldPassword: string; newPassword: string }) => {
    const success = await updateUser({ email: data.newEmail, password: {new: data.newPassword, old: data.oldPassword}, name: data.newName });
    if (success) {
      setOldPassword("");
      setNewPassword("");
    }
  };

  useEffect(() => {
    setFormRef("update-user", formRef);
  }, [formRef])

  return (
    <PageContainer pageTitle="Account" alignCenter>

    <h2 className="font-bold text-3xl mb-7.5">Welcome, {name}!</h2>
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
          placeholder="Old Password"
          value={oldPassword}
          setValue={setOldPassword}
          blured
          inputFormProps={register("oldPassword")}
          error={errors.oldPassword && errors.oldPassword}
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
    </PageContainer>
  );
};

export default UserPage;