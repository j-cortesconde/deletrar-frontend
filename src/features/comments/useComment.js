import { useQuery } from "@tanstack/react-query";

import { getComment } from "../../services/apiComments";

// TYPE must be one of [post, collection, comment]
export function useComment(commentId) {
  const {
    isLoading,
    data: comment,
    error,
  } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getComment(commentId),
    retry: false,
  });

  return { isLoading, comment, error };
}
