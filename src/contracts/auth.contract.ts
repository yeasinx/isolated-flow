import { z } from "zod";
import { UserSchema } from "./user.contract";

export const LoginRequestSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const LoginSuccessResponseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
  user: UserSchema,
});

export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.enum(["VALIDATION_ERROR", "UNAUTHORIZED", "INTERNAL_SERVER_ERROR"]),
    message: z.string(),
    details: z
      .array(
        z.object({
          field: z.string(),
          message: z.string(),
        }),
      )
      .optional(),
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginSuccessResponse = z.infer<typeof LoginSuccessResponseSchema>;
export type FieldError = { field: string; message: string };
