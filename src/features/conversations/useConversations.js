import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getConversations } from "../../services/apiConversations";
import { PAGE_SIZE } from "../../utils/constants";

// TODO: Must implement pagination. I commented out pevious pagination because its not being userd and I want to use infinite querie pagination instead
export function useConversations() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `page=${page}&limit=${limit}`;

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["conversations"],
    // queryKey: ["conversations", ownUser.username, page],
    queryFn: () => getConversations(queryString),
    retry: false,
    refetchOnMount: "always",
    // TODO: Check how this works when adding infinite pagination
    staleTime: 60 * 1000,
  });

  const { conversations, totalCount, hasNextPage, nextPage } = data || {};

  // // PRE-FETCHING of next and previous pages
  // const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  // const nextQueryString = `page=${page + 1}&limit=${limit}`;

  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["conversations", ownUser.username, page + 1],
  //     queryFn: () => getConversations(nextQueryString),
  //   });

  // const previousQueryString = `page=${page - 1}&limit=${limit}`;

  // if (page > 1)
  //   queryClient.prefetchQuery({
  //     queryKey: ["conversations", ownUser.username, page - 1],
  //     queryFn: () => getConversations(previousQueryString),
  //   });

  return {
    isLoading,
    conversations,
    totalCount,
    hasNextPage,
    nextPage,
    error,
    refetch,
  };
}
