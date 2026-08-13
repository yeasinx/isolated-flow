import { z } from "zod";
import { UserSchema } from "./user.contract";

export const UserListResponseSchema = z.object({
  users: z.array(UserSchema),

  totalPages: z.number().int().min(0),
  currentPage: z.number().int().min(1),
});

export type UserListResponse = z.infer<typeof UserListResponseSchema>;
