import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../../services/apiPosts";

export function useSearchPosts(query) {
  const {
    isFetching,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["searchedPosts", query],
    queryFn: () => searchPosts(query),
  });

  return { isFetching, posts, error };
}
