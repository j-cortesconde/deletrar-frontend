import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getFollowing } from "../../services/apiUsers";
import { PAGE_SIZE } from "../../utils/constants";

export function useFollowing(followerUsername) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["following", followerUsername, page],
    queryFn: () => getFollowing(followerUsername, queryString),
    retry: false,
  });

  const following = data?.[0]?.followingUsers;
  const count = data?.[0]?.totalAmount;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["following", followerUsername, page + 1],
      queryFn: () => getFollowing(followerUsername, nextQueryString),
    });

  const previousQueryString = `page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["following", followerUsername, page - 1],
      queryFn: () => getFollowing(followerUsername, previousQueryString),
    });

  return { isLoading, following, count, error };
}
