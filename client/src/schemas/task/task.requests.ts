import { z } from "zod";

export const taskUploadSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isDone: z.boolean(),
});

export type TaskUploadDTO = z.infer<typeof taskUploadSchema>;