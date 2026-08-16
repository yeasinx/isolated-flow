import { http, HttpResponse } from "msw";

import validLogin from "./fixtures/valid-login.json";
import authError from "./fixtures/auth-error.json";
import validationError from "./fixtures/validation-error.json";

export const handler = [
  http.post("/api/v1/auth/login", async ({ request }) => {
    const payload = (await request.json()) as {
      email: string;
      password: string;
    };

    const { email, password } = payload;

    if (email === "invalid-email") {
      return HttpResponse.json(validationError, { status: 400 });
    }

    if (email === "john@example.com" && password !== "password12") {
      return HttpResponse.json(authError, { status: 401 });
    }

    if (email !== "john@example.com") {
      return HttpResponse.json(authError, { status: 401 });
    }

    return HttpResponse.json(validLogin, { status: 200 });
  }),
];
