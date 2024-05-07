import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";

export function useUser(userId) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  return { isLoading, user, error };
}
