import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageAPI } from "../../services/apiConversations";

export function useSendMesssage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ addressee, message }) => sendMessageAPI(addressee, message),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["conversation", data?.addressee],
        data?.conversation,
      );
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  return { sendMessage, isSending };
}
