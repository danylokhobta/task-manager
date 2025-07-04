import { z } from "zod";

export const userSchema = z.object({
  id: z
    .number()
    .int()
    .positive(),
  name: z
    .string(),
  email: z
    .string()
    .email(),
  createdAt: z
    .string(),
  updatedAt: z
    .string(),
});
export type UserDTO = z.infer<typeof userSchema>;