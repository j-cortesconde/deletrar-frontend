import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../../services/apiPosts";

export function useSearchPosts(query) {
  const {
    isFetching,
    data: posts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchedPosts"],
    queryFn: () => searchPosts(query),
  });

  return { isFetching, posts, error, refetch };
}
