import { http, HttpResponse } from "msw";
import validUser from "./fixtures/valid-user.json";
import edgeLongName from "./fixtures/edge-long-name.json";

export const handler = [
  http.get("/api/v1/users/:id", ({ params }) => {
    const { id } = params;

    if (id === "usr_123") {
      return HttpResponse.json(validUser);
    }

    if (id === "usr_456") {
      return HttpResponse.json(edgeLongName);
    }

    return new HttpResponse(null, {
      status: 404,
      statusText: "Not Found",
    });
  }),
];
