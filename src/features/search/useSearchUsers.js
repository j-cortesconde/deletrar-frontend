import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUsers";

export function useSearchUsers(query) {
  const {
    isFetching,
    data: users,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchedUsers"],
    queryFn: () => searchUsers(query),
  });

  return { isFetching, users, error, refetch };
}
