import { useInfiniteQuery } from "@tanstack/react-query";

import { getConversations } from "../../services/apiConversations";

export function useConversations() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    retry: false,
    refetchOnMount: "always",
    // TODO: Check how this works when adding infinite pagination
    staleTime: 60 * 1000,
  });

  // const conversation = data?.pages?.[0]?.conversation;
  // const pages = [...(data?.pages || [])].reverse();

  return {
    // conversation,
    // pages,
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
}

// const [searchParams] = useSearchParams();
// const queryClient = useQueryClient();
// const ownUser = queryClient.getQueryData(["user"]);

// const page = Number(searchParams.get("page")) || 1;
// const limit = PAGE_SIZE;

// const queryString = `page=${page}&limit=${limit}`;

// const { isLoading, data, error, refetch } = useQuery({
//   queryKey: ["conversations"],
//   // queryKey: ["conversations", ownUser.username, page],
//   queryFn: () => getConversations(queryString),
//   retry: false,
//   refetchOnMount: "always",
//   // TODO: Check how this works when adding infinite pagination
//   staleTime: 60 * 1000,
// });

// const { conversations, totalCount, hasNextPage, nextPage } = data || {};

// // // PRE-FETCHING of next and previous pages
// // const pageCount = Math.ceil(totalCount / PAGE_SIZE);

// // const nextQueryString = `page=${page + 1}&limit=${limit}`;

// // if (page < pageCount)
// //   queryClient.prefetchQuery({
// //     queryKey: ["conversations", ownUser.username, page + 1],
// //     queryFn: () => getConversations(nextQueryString),
// //   });

// // const previousQueryString = `page=${page - 1}&limit=${limit}`;

// // if (page > 1)
// //   queryClient.prefetchQuery({
// //     queryKey: ["conversations", ownUser.username, page - 1],
// //     queryFn: () => getConversations(previousQueryString),
// //   });

// return {
//   isLoading,
//   conversations,
//   totalCount,
//   hasNextPage,
//   nextPage,
//   error,
//   refetch,
// };
