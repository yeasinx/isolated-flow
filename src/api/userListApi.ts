import {
  UserListResponseSchema,
  type UserListResponse,
} from "../contracts/userList.contract";

export async function getUserList(page: number): Promise<UserListResponse> {
  const response = await fetch(`/api/v1/users?page=${page}`);

  if (!response.ok) {
    throw new Error(`API request failed with statue: ${response.status}`);
  }

  const rawData = await response.json();

  return UserListResponseSchema.parse(rawData);
}
