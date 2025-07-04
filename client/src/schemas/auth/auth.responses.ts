import { z } from "zod";

const baseAuthResponseSchema = z.object({
  access_token: z.string()
});

// Only what is needed for registration
export const signupResponseSchema = baseAuthResponseSchema;
export type SignupResponseDTO = z.infer<typeof signupResponseSchema>;

// For signing in
export const signinResponseSchema = baseAuthResponseSchema;
export type SigninResponseDTO = z.infer<typeof signinResponseSchema>;
