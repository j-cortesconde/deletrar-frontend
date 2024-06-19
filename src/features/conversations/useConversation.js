import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/apiConversations";
export function useConversation(username) {
  const {
    isLoading,
    data: conversation,
    error,
    refetch,
  } = useQuery({
    queryKey: ["conversation", username],
    queryFn: () => getConversation(username),
    retry: false,
  });

  return { isLoading, conversation, error, refetch };
}
