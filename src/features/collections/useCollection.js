import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/apiCollections";

export function useCollection(collectionId) {
  const {
    isLoading,
    data: collection,
    error,
  } = useQuery({
    queryKey: ["collection", collectionId],
    queryFn: () => getCollection(collectionId),
    retry: false,
  });

  return { isLoading, collection, error };
}
