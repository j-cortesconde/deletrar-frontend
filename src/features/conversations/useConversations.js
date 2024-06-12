import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getConversations } from "../../services/apiConversations";
import { PAGE_SIZE } from "../../utils/constants";

export function useConversations() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["conversations", ownUser.username, page],
    queryFn: () => getConversations(ownUser.username, queryString),
    retry: false,
  });

  const conversations = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["conversations", ownUser.username, page + 1],
      queryFn: () => getConversations(ownUser.username, nextQueryString),
    });

  const previousQueryString = `page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["conversations", ownUser.username, page - 1],
      queryFn: () => getConversations(ownUser.username, previousQueryString),
    });

  return { isLoading, conversations, count, error };
}
