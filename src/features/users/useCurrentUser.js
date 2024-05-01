import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const {
    isLoading,
    data: user,
    isFetching,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser, retry: false });

  const isAuthenticated = user ? true : false;

  return {
    isLoading,
    user,
    isFetching,
    isAuthenticated,
  };
}
