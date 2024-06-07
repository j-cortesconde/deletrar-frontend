import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import { getSavedPosts } from "../../services/apiPosts";
import { PAGE_SIZE, POST_SORT_OPTIONS } from "../../utils/constants";

export function useSavedPosts() {
  const [searchParams] = useSearchParams();
  const { username } = useParams();
  const queryClient = useQueryClient();

  const sortBy = searchParams.get("sortBy") || POST_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["saved posts", username, sortBy, page],
    queryFn: () => getSavedPosts(username, queryString),
    retry: false,
  });

  const posts = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `sortBy=${sortBy}&page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["saved posts", username, sortBy, page + 1],
      queryFn: () => getSavedPosts(username, nextQueryString),
    });

  const previousQueryString = `sortBy=${sortBy}&page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["saved posts", username, sortBy, page - 1],
      queryFn: () => getSavedPosts(username, previousQueryString),
    });

  return { isLoading, posts, count, error };
}
