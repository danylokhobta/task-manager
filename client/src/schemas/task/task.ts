import { z } from "zod";

export const taskSchema = z.object({
  id: z
    .number()
    .int()
    .positive(),
  title: z
    .string(),
  description: z
    .string(),
  isDone: z
    .boolean(),
  createdAt: z
    .string(),
  updatedAt: z
    .string()
    .optional(),
  userId: z
    .number()
    .int()
    .optional(),
});

export type TaskDTO = z.infer<typeof taskSchema>;

export const allTasksSchema = z.array(taskSchema);