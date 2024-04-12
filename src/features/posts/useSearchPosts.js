import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../../services/apiPosts";

export function useSearchPosts(query) {
  const {
    isLoading,
    data: posts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchedPosts"],
    queryFn: () => searchPosts(query),
  });

  return { isLoading, posts, error, refetch };
}
