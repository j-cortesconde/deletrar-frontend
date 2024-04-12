import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="text-center text-yellow-600">
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
