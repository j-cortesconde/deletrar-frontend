import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../features/users/useCurrentUser";

import Loader from "./Loader";
import { useEffect } from "react";
import { useLogout } from "../features/authentication/useLogout";

function AccountStatusProtection({ children }) {
  const { logout } = useLogout();

  // 1. Load the authenticated user
  const {
    isLoading,
    isAuthenticated,
    isInitialized,
    isActive,
    isRequestor,
    isFetching,
  } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated && !isLoading && !isFetching) {
        // 2. If authenticated user account is a requestor and somehow they managed to log in, log them out
        if (isRequestor) return logout();

        // 3. If authenticated user account is inactive, redirect to account reactivation
        if (!isActive)
          return navigate("/account/reactivate", { replace: true });

        // 4. If authenticated user account isn't initialized, redirect to account initialization
        if (!isInitialized)
          return navigate("/account/initialize", { replace: true });
      }
    },
    [
      isAuthenticated,
      isRequestor,
      isActive,
      isInitialized,
      isLoading,
      navigate,
      isFetching,
      logout,
    ],
  );

  // 5. While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <Loader />
      </div>
    );

  // 6. If there is no authenticated user, render
  if (!isAuthenticated) return children;

  // 7. If authenticated user account is active and initialized, render
  if (isActive && isInitialized) return children;
}

export default AccountStatusProtection;
