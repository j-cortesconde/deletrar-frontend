import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/apiConversations";

export function useConversation(username) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["conversation", username],
    queryFn: ({ pageParam }) => getConversation(username, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    retry: false,
    refetchOnMount: "always",
    // TODO: Check how this works when adding infinite pagination
    staleTime: 60 * 1000,
  });

  const conversation = data?.pages?.[0]?.conversation;
  const pages = [...(data?.pages || [])].reverse();

  return {
    conversation,
    pages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
}
