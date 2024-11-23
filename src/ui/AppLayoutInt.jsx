import { Outlet } from "react-router-dom";
import Header from "./Header";
import CreateNewButton from "./CreateNewButton";
import { useCurrentUser } from "../features/users/useCurrentUser";

function AppLayoutInt() {
  const { user } = useCurrentUser();

  return (
    <div className="flex h-screen flex-col overflow-auto">
      <Header user={user} />
      <main className="my-4 h-screen flex-1 overflow-auto px-4 text-center">
        <Outlet />
        {user ? <CreateNewButton /> : ""}
      </main>
    </div>
  );
}

export default AppLayoutInt;
