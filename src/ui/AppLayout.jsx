import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="text-center">
      <Header />
      <main className="m-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
