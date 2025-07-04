import { z } from "zod";

export const loadStatusSchema = z.enum(["idle", "loading", "success", "error"]);
export type LoadStatus = z.infer<typeof loadStatusSchema>;