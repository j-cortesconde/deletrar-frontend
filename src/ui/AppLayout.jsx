import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useCurrentUser } from "../features/users/useCurrentUser";
import CreatePost from "../features/posts/CreatePost";

function AppLayout() {
  const { user } = useCurrentUser();

  return (
    <div className="flex h-screen flex-col">
      <Header user={user} />
      <main className="m-4  flex-1 text-center">
        <Outlet />
        {user ? <CreatePost /> : ""}
      </main>
    </div>
  );
}

export default AppLayout;
