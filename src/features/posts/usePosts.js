import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

export function usePosts(authorUsername) {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts", authorUsername],
    queryFn: () => getPosts(authorUsername),
    retry: false,
  });

  return { isLoading, posts, error };
}
