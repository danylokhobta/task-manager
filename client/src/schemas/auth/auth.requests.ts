import { z } from "zod";

// Only what is needed for registration
export const signupRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must have at least 3 symbols" }),
  email: z
    .string()
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 symbols" }),
});
export type SignupRequestDTO = z.infer<typeof signupRequestSchema>;

// For signing in
export const signinRequestSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});
export type SigninRequestDTO = z.infer<typeof signinRequestSchema>;
