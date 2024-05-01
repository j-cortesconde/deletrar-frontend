import { Outlet } from "react-router-dom";
import Logo from "./Logo";

function AppLayoutExt() {
  return (
    <main className="grid min-h-screen grid-cols-1 content-center justify-center gap-14 bg-stone-200 p-10 sm:grid-cols-[648px]">
      <Logo size="large" />
      <Outlet />
    </main>
  );
}

export default AppLayoutExt;
