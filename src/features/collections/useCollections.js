//FIXME: FIx the POST_SORT_OPTIONS
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getCollections } from "../../services/apiCollections";
import { PAGE_SIZE, POST_SORT_OPTIONS } from "../../utils/constants";

export function useCollections(collectorUsername) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const sortBy = searchParams.get("sortBy") || POST_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["collections", collectorUsername, sortBy, page],
    queryFn: () => getCollections(collectorUsername, queryString),
    retry: false,
  });

  const collections = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `sortBy=${sortBy}&page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["collections", collectorUsername, sortBy, page + 1],
      queryFn: () => getCollections(collectorUsername, nextQueryString),
    });

  const previousQueryString = `sortBy=${sortBy}&page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["collections", collectorUsername, sortBy, page - 1],
      queryFn: () => getCollections(collectorUsername, previousQueryString),
    });

  return { isLoading, collections, count, error };
}
