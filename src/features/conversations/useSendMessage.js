import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiConversations";

export function useSendMesssage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ addressee, message }) => sendMessageAPI(addressee, message),
    onSuccess: ({ conversation, addressee, newMessage }) => {
      queryClient.setQueryData(["conversation", addressee], (oldData) => {
        const { pages: oldPages, pageParams: oldPageParams } = oldData;

        const newPages = [
          {
            conversation,
            messages: [...(oldPages?.[0]?.messages || []), newMessage],
          },
          ...oldPages.slice(1),
        ];

        newPages[0].conversation.lastMessage = newMessage;

        return { pages: newPages, pageParams: oldPageParams };
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
