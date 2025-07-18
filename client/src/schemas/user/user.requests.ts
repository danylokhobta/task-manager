import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UserUpdateDTO = z.infer<typeof userUpdateSchema>;