import { useUserList } from "../hooks/useUserList";

export function UserList() {
  const { state, goToPage } = useUserList();

  switch (state.status) {
    case "loading":
      return (
        <div aria-busy="true">
          <p>Loading user list...</p>
        </div>
      );

    case "empty":
      return (
        <div>
          <h2>No users added yet</h2>
          <p>Once you add users, they will appear here.</p>
        </div>
      );

    case "error":
      return (
        <div role="alert">
          <p>{state.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );

    case "success":
      return (
        <div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="badge">{user.role.toUpperCase()}</td>
                  <td>
                    {/* Safe date formatting because createdAt is optional */}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Pagination">
            <button
              onClick={() => goToPage(state.currentPage - 1)}
              disabled={state.currentPage === 1}
            >
              Previous
            </button>

            <span>
              {state.currentPage} of {state.totalPages}
            </span>

            <button
              onClick={() => goToPage(state.currentPage + 1)}
              disabled={state.currentPage === state.totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      );

    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}
