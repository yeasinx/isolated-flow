import { UserSchema, type User } from "../contracts/user.contract";

export async function getUserProfile(userId: string): Promise<User> {
  const response = await fetch(`/api/v1/users/${userId}`);

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const rawData = await response.json();

  return UserSchema.parse(rawData);
}
