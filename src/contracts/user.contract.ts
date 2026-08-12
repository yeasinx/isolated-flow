import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "editor", "viewer"]);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name cannot be empty"),
  email: z.email("Invalid email format"),
  role: UserRoleSchema,
  // The Edge Case handler: Can be ISO date string, Or null, or missing entirely
  createdAt: z.iso.datetime().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
