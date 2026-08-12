import { beforeAll, afterEach, afterAll, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { server } from "../../../mocks/server";
import invalidRoleUser from "../../../mocks/fixtures/invalid-role.json";
import { UserProfile } from "../components/UserProfile";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("UserProfile Feature", () => {
  it("shows loading state initially", () => {
    render(<UserProfile userId="usr_123" />);

    expect(screen.getByText(/loading profile/i)).toBeTruthy();
  });

  it("renders user data on success", async () => {
    render(<UserProfile userId="usr_123" />);

    expect(await screen.findByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john@example.com")).toBeTruthy();
    expect(screen.getByText("EDITOR")).toBeTruthy();
  });

  it("shows not found state for 404", async () => {
    render(<UserProfile userId="usr_999" />);

    expect(await screen.findByText(/user not found/i)).toBeTruthy();
  });

  it("shows error state if the backend breaks the contract", async () => {
    server.use(
      http.get("/api/v1/users/usr_bad", () => {
        return HttpResponse.json(invalidRoleUser);
      }),
    );

    render(<UserProfile userId="usr_bad" />);

    expect(await screen.findByText(/unable to load data/i)).toBeTruthy();
  });
});
