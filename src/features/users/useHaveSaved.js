import { useQuery } from "@tanstack/react-query";

import { haveSaved as haveSavedApi } from "../../services/apiUsers";

// docType can either be 'post' or 'collection'
export function useHaveSaved(docId, docType) {
  const {
    isLoading,
    data: haveSaved,
    error,
  } = useQuery({
    queryKey: ["haveSaved", docId],
    queryFn: () => haveSavedApi(docId, docType),
    retry: false,
  });

  return { isLoading, error, haveSaved };
}
