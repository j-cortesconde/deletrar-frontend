import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getComments } from "../../services/apiComments";
import { COMMENT_PAGE_AMOUNT } from "../../utils/constants";

// TYPE must be one of [post, collection, comment]
export function useComments({ type, id, page }) {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", type, id, page],
    queryFn: () => getComments(type, id, page),
    retry: false,
  });

  const comments = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / COMMENT_PAGE_AMOUNT);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["comments", type, id, page + 1],
      queryFn: () => getComments(type, id, page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["comments", type, id, page - 1],
      queryFn: () => getComments(type, id, page - 1),
    });

  return { isLoading, comments, count, error };
}
