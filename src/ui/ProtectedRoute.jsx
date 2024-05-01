import { useCurrentUser } from "../features/users/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useCurrentUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
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
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
