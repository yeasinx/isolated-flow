import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { server } from "../../../mocks/server";
import { UserList } from "../components/UsersList";
import invalidUsersList from "../mocks/fixtures/invalid-user-list.json";
import emptyUsersList from "../mocks/fixtures/empty-user-list.json";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("UserList Feature", () => {
  it("shows loading state initially", () => {
    render(<UserList />);

    expect(screen.getByText(/loading user list/i)).toBeTruthy();
  });

  it("renders user data on success", async () => {
    render(<UserList />);

    expect(await screen.findByText("Ratan")).toBeTruthy();
    expect(screen.getByText("ratan@example.com")).toBeTruthy();
    expect(screen.getByText("VIEWER")).toBeTruthy();
  });

  it("shows empty state when no users exist", async () => {
    server.use(
      http.get("/api/v1/users", () => {
        return HttpResponse.json(emptyUsersList);
      }),
    );

    render(<UserList />);

    expect(await screen.findByText(/no users added yet/i)).toBeTruthy();
  });

  it("shows error state if the backend breaks the contract", async () => {
    server.use(
      http.get("/api/v1/users", () => {
        return HttpResponse.json(invalidUsersList);
      }),
    );

    render(<UserList />);

    expect(await screen.findByText(/unable to load data/i)).toBeTruthy();
  });
});
