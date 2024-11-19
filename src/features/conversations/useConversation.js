import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/apiConversations";

// TODO: Must add infinite pagination
export function useConversation(username) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["conversation", username],
    queryFn: () => getConversation(username),
    retry: false,
    refetchOnMount: "always",
    // TODO: Check how this works when adding infinite pagination
    staleTime: 60 * 1000,
  });

  const { conversation, messages } = data || {};

  return { isLoading, conversation, messages, error, refetch };
}
