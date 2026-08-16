import { setupServer } from "msw/node";
import { handler as userProfileHandler } from "../features/user-profile/mocks/handlers";
import { handler as userListHandler } from "../features/user-list/mocks/handlers";
import { handler as authHandlers } from "../features/auth/mocks/handlers";

export const server = setupServer(
  ...userProfileHandler,
  ...userListHandler,
  ...authHandlers,
);
