import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useCurrentUser } from "../features/users/useCurrentUser";

import Loader from "./Loader";

function LoginProtection() {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useCurrentUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching)
        navigate("/account/login");
    },
    [isAuthenticated, isLoading, isFetching, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <Loader />
      </div>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return <Outlet />;
}

export default LoginProtection;
