import {
  ApiErrorSchema,
  LoginRequestSchema,
  LoginSuccessResponseSchema,
  type FieldError,
  type LoginRequest,
  type LoginSuccessResponse,
} from "../contracts/auth.contract";
import { AuthenticationError, ValidationError } from "./error";

export async function loginUser(
  credentials: LoginRequest,
): Promise<LoginSuccessResponse> {
  const validatedCredentials = LoginRequestSchema.parse(credentials);

  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedCredentials),
  });

  const rawData = await response.json();

  if (!response.ok) {
    const errorData = ApiErrorSchema.parse(rawData);

    if (errorData.error.code === "VALIDATION_ERROR") {
      throw new ValidationError(
        errorData.error.message,
        (errorData.error.details ?? []) as FieldError[],
      );
    }

    if (errorData.error.code === "UNAUTHORIZED") {
      throw new AuthenticationError(errorData.error.message);
    }

    throw new Error(errorData.error.message);
  }

  return LoginSuccessResponseSchema.parse(rawData);
}
