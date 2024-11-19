import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiConversations";

export function useSendMesssage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ addressee, message }) => sendMessageAPI(addressee, message),
    onSuccess: ({ addressee, newMessage }) => {
      queryClient.setQueryData(["conversation", addressee], (oldData) => {
        const { conversation } = oldData;
        const messages = [...oldData.messages, newMessage];
        return { conversation, messages };
      });

      queryClient.refetchQueries({
        queryKey: ["conversations"],
        type: "active",
        exact: true,
      });
    },
  });

  return { sendMessage, isSending };
}
