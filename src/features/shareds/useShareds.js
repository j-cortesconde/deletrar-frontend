import { useInfiniteQuery } from "@tanstack/react-query";
import { getShareds } from "../../services/apiShareds";

export function useShareds(sharerUsername) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["shareds", sharerUsername],
    queryFn: ({ pageParam }) => getShareds({ sharerUsername, pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    retry: false,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
}
