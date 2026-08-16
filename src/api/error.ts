import type { FieldError } from "../contracts/auth.contract";

export class ValidationError extends Error {
  public details: FieldError[];

  constructor(message: string, details: FieldError[]) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}
