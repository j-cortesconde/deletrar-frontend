import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE, POST_SORT_OPTIONS } from "../../utils/constants";

export function usePosts(authorUsername) {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || POST_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts", authorUsername, sortBy, page],
    queryFn: () => getPosts(authorUsername, queryString),
    retry: false,
  });

  const posts = data?.docs;
  const count = data?.count;

  return { isLoading, posts, count, error };
}
