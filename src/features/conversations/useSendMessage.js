import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiConversations";

export function useSendMesssage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ addressee, message }) => sendMessageAPI(addressee, message),
    onSuccess: ({
      conversation: updatedConversation,
      addressee,
      newMessage,
    }) => {
      queryClient.setQueryData(["conversation", addressee], (oldData) => {
        const { pages: oldPages, pageParams: oldPageParams } = oldData;

        const newPages = [
          {
            ...oldPages[0],
            conversation: updatedConversation,
            messages: [...(oldPages?.[0]?.messages || []), newMessage],
          },
          ...oldPages.slice(1),
        ];

        newPages[0].conversation.lastMessage = newMessage;

        return { pages: newPages, pageParams: oldPageParams };
      });

      queryClient.setQueryData(["conversations"], (oldData) => {
        const { pages, pageParams } = oldData;

        // Access al 'conversations' arrays and filter them. Modify the arrays and each page containing them.
        const updatedPages = pages.map((page) => {
          const filteredConversations = page.conversations?.filter(
            (conv) => conv._id !== updatedConversation._id,
          );
          return { ...page, conversations: filteredConversations };
        });

        // Insert the updated conversation into the 'conversations' array of the first page
        updatedPages[0].conversations = [
          updatedConversation,
          ...(updatedPages[0]?.conversations || []),
        ];

        return { pages: updatedPages, pageParams };
      });
    },
  });

  return { sendMessage, isSending };
}
