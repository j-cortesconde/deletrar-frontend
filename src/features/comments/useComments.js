// TODO: How to implement pagination (see usePosts) (and add pre-fetching)
import { useQuery } from "@tanstack/react-query";

import { getComments } from "../../services/apiComments";

// TYPE must be one of [post, collection, comment]
export function useComments({ type, id }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", type, id],
    queryFn: () => getComments(type, id),
    retry: false,
  });

  const comments = data?.docs;
  const count = data?.count;

  return { isLoading, comments, count, error };
}
