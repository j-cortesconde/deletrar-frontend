import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const {
    isLoading,
    data: user,
    isFetching,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: getCurrentUser, retry: false });

  return {
    isLoading,
    user,
    isFetching,
  };
}
