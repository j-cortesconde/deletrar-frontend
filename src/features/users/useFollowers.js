import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getFollowers } from "../../services/apiUsers";
import { PAGE_SIZE } from "../../utils/constants";

export function useFollowers(followedUsername) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["followers", followedUsername, page],
    queryFn: () => getFollowers(followedUsername, queryString),
    retry: false,
  });

  const followers = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["followers", followedUsername, page + 1],
      queryFn: () => getFollowers(followedUsername, nextQueryString),
    });

  const previousQueryString = `page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["followers", followedUsername, page - 1],
      queryFn: () => getFollowers(followedUsername, previousQueryString),
    });

  return { isLoading, followers, count, error };
}
