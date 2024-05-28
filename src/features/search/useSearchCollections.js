import { useQuery } from "@tanstack/react-query";
import { searchCollections } from "../../services/apiCollections";

export function useSearchCollections(query) {
  const {
    isFetching,
    data: collections,
    error,
  } = useQuery({
    queryKey: ["searchedCollections", query],
    queryFn: () => searchCollections(query),
  });

  return { isFetching, collections, error };
}
