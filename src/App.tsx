import "./App.css";
import { UserList } from "./features/user-list";
import { UserProfile } from "./features/user-profile";

function App() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <UserList />
      <UserProfile userId="usr_123"/>
    </main>
  );
}

export default App;
