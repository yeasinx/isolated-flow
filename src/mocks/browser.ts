import { setupWorker } from "msw/browser";

import { handler as UserProfileHandler } from "../features/user-profile/mocks/handlers";
import { handler as UserListHandler } from "../features/user-list/mocks/handlers";
import { handler as authHandler } from "../features/auth/mocks/handlers";

export const worker = setupWorker(
  ...UserProfileHandler,
  ...UserListHandler,
  ...authHandler,
);
