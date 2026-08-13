import { useEffect, useState } from "react";

import type { User } from "../../../contracts/user.contract";
import { getUserList } from "../../../api/userListApi";

type UserListState =
  | { status: "loading" }
  | {
      status: "success";
      users: User[];
      totalPages: number;
      currentPage: number;
    }
  | { status: "empty" }
  | { status: "error"; message: string };

export function useUserList(initialPage: number = 1) {
  const [page, setPage] = useState(initialPage);
  const [state, setState] = useState<UserListState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function fetchList() {
      setState({ status: "loading" });

      try {
        const response = await getUserList(page);

        if (isMounted) {
          if (response.users.length === 0) {
            setState({ status: "empty" });
          } else {
            setState({
              status: "success",
              users: response.users,
              totalPages: response.totalPages,
              currentPage: response.currentPage,
            });
          }
        }
      } catch (error: any) {
        console.error("Contract violation", error)
        if (isMounted) {
          setState({
            status: "error",
            message: "Unable to load data, please try again.",
          });
        }
      }
    }

    fetchList();
    return () => {
      isMounted = false;
    };
  }, [page]);

  return { state, goToPage: setPage };
}
