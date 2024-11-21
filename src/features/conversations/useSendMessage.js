import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiConversations";

export function useSendMesssage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ addressee, message }) => sendMessageAPI(addressee, message),
    onSuccess: ({ conversation, addressee, newMessage }) => {
      queryClient.setQueryData(["conversation", addressee], (oldData) => {
        const messages = [...(oldData?.messages || []), newMessage];
        return { conversation, messages };
      });

      queryClient.setQueryData(["conversations"], (oldData) => {
        const { totalCount, hasNextPage, nextPage } = oldData;

        const filteredConversations = oldData?.conversations?.filter(
          (oldConversation) => oldConversation._id !== conversation._id,
        );

        conversation.lastMessage = newMessage;

        const conversations = [conversation, ...(filteredConversations || [])];

        return { totalCount, hasNextPage, nextPage, conversations };
      });
    },
  });

  return { sendMessage, isSending };
}
