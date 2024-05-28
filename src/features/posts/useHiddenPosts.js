import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getOwnHiddenPosts } from "../../services/apiPosts";
import { PAGE_SIZE, HIDDEN_POST_SORT_OPTIONS } from "../../utils/constants";

export function useHiddenPosts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const sortBy =
    searchParams.get("sortBy") || HIDDEN_POST_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["hidden posts", ownUser.username, sortBy, page],
    queryFn: () => getOwnHiddenPosts(queryString),
    retry: false,
  });

  const posts = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `sortBy=${sortBy}&page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["hidden posts", ownUser.username, sortBy, page + 1],
      queryFn: () => getOwnHiddenPosts(nextQueryString),
    });

  const previousQueryString = `sortBy=${sortBy}&page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["hidden posts", ownUser.username, sortBy, page - 1],
      queryFn: () => getOwnHiddenPosts(previousQueryString),
    });

  return { isLoading, posts, count, error };
}
