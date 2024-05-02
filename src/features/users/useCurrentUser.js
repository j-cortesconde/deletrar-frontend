import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUsers";

export function useCurrentUser() {
  const {
    isLoading,
    data: user,
    isFetching,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser, retry: false });

  const isRequestor = user?.role === "requestor";
  const isActive = user?.active;
  const isInitialized = user?.role === "user" || user?.role === "admin";
  const isAuthenticated = user ? true : false;

  return {
    isLoading,
    user,
    isFetching,
    isAuthenticated,
    isInitialized,
    isActive,
    isRequestor,
  };
}
