import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getPosts } from "../../services/apiPosts";
import { PAGE_SIZE, POST_SORT_OPTIONS } from "../../utils/constants";

export function usePosts(authorUsername) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const sortBy = searchParams.get("sortBy") || POST_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts", authorUsername, sortBy, page],
    queryFn: () => getPosts(authorUsername, queryString),
    retry: false,
  });

  const posts = data?.limitedDocuments;
  const count = data?.totalCount;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `sortBy=${sortBy}&page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["posts", authorUsername, sortBy, page + 1],
      queryFn: () => getPosts(authorUsername, nextQueryString),
    });

  const previousQueryString = `sortBy=${sortBy}&page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["posts", authorUsername, sortBy, page - 1],
      queryFn: () => getPosts(authorUsername, previousQueryString),
    });

  return { isLoading, posts, count, error };
}
