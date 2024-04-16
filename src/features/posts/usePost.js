import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPosts";
export function usePost(postId) {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return { isLoading, post, error };
}
