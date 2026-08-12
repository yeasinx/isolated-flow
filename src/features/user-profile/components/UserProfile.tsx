import { useUserProfile } from "../hooks/useUserProfile";

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const state = useUserProfile(userId);

  switch (state.status) {
    case "loading":
      return <div aria-busy="true">Loading profile...</div>;
    case "error":
      return (
        <div role="alert">
          <p>{state.message}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      );
    case "notFound":
      return (
        <div>
          <h2>User not found</h2>
          <p>The user you looking for does not exist.</p>
        </div>
      );
    case "success":
      const user = state.data;

      return (
        <article>
          <h1>{user.name}</h1>
          <p>{user.email}</p>

          <span>{user.role.toUpperCase()}</span>

          {user.createdAt && (
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          )}
        </article>
      );

    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}
