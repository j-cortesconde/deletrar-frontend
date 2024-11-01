import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../services/apiFeed";

// TODO: This gives a basic feed. Must add feed pagination. MVP
export function useFeed() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed(),
    retry: false,
  });

  const count = data?.count;
  const feed = data?.limitedDocuments;

  return { isLoading, count, feed, error };
}
