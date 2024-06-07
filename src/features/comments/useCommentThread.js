import { useQuery } from "@tanstack/react-query";

import { getCommentThread } from "../../services/apiComments";

// TYPE must be one of [post, collection, comment]
export function useCommentThread(commentId) {
  const {
    isLoading,
    data: commentThread,
    error,
  } = useQuery({
    queryKey: ["commentThread", commentId],
    queryFn: () => getCommentThread(commentId),
    retry: false,
  });

  return { isLoading, commentThread, error };
}
