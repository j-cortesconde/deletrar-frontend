import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import { getSavedCollections } from "../../services/apiCollections";
import { COLLECTION_SORT_OPTIONS, PAGE_SIZE } from "../../utils/constants";

export function useSavedCollections() {
  const [searchParams] = useSearchParams();
  const { username } = useParams();
  const queryClient = useQueryClient();

  const sortBy = searchParams.get("sortBy") || COLLECTION_SORT_OPTIONS[0].value;
  const page = Number(searchParams.get("page")) || 1;
  const limit = PAGE_SIZE;

  const queryString = `sortBy=${sortBy}&page=${page}&limit=${limit}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["saved collections", username, sortBy, page],
    queryFn: () => getSavedCollections(username, queryString),
    retry: false,
  });

  const collections = data?.docs;
  const count = data?.count;

  // PRE-FETCHING of next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextQueryString = `sortBy=${sortBy}&page=${page + 1}&limit=${limit}`;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["saved collections", username, sortBy, page + 1],
      queryFn: () => getSavedCollections(username, nextQueryString),
    });

  const previousQueryString = `sortBy=${sortBy}&page=${page - 1}&limit=${limit}`;

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["saved collections", username, sortBy, page - 1],
      queryFn: () => getSavedCollections(username, previousQueryString),
    });

  return { isLoading, collections, count, error };
}
