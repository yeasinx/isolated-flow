import { useEffect, useState } from "react";
import type { User } from "../../../contracts/user.contract";
import { getUserProfile } from "../../../api/userApi";

type UserProfileState =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "notFound" }
  | { status: "error"; message: string };

export function useUserProfile(userId: string) {
  const [state, setState] = useState<UserProfileState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      setState({ status: "loading" });

      try {
        const user = await getUserProfile(userId);

        if (isMounted) {
          setState({ status: "success", data: user });
        }
      } catch (error: any) {
        if (isMounted) {
          if (error.message.includes("404")) {
            setState({ status: "notFound" });
          } else {
            setState({
              status: "error",
              message: "Unable to load data, please try again.",
            });
          }
        }
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return state;
}
