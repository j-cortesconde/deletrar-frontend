import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/apiConversations";
export function useConversation(username) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["conversation", username],
    queryFn: () => getConversation(username),
    retry: false,
  });

  const { conversation, messages } = data || {};

  return { isLoading, conversation, messages, error, refetch };
}
