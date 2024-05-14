import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { useSearchParams } from "react-router-dom";

export function usePosts(authorUsername) {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "postedAt-desc";
  const page = Number(searchParams.get("page")) || 1;

  const queryString = `sortBy=${sortBy}&page=${page}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts", authorUsername, sortBy, page],
    queryFn: () => getPosts(authorUsername, queryString),
    retry: false,
  });

  const posts = data?.docs;
  const count = data?.count;

  return { isLoading, posts, count, error };
}
