import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";

export function useUser(username) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    retry: false,
  });

  return { isLoading, user, error };
}
