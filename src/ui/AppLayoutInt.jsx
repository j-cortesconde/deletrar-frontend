import { Outlet } from "react-router-dom";
import Header from "./Header";
import CreateNewButton from "./CreateNewButton";
import { useQueryClient } from "@tanstack/react-query";

function AppLayoutInt() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  return (
    <div className="flex h-screen flex-col">
      <Header user={user} />
      <main className="m-4 flex-1 text-center">
        <Outlet />
        {user ? <CreateNewButton /> : ""}
      </main>
    </div>
  );
}

export default AppLayoutInt;
