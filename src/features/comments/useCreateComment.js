import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createComment as createCommentAPI } from "../../services/apiComments";
export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (newComment) => createCommentAPI(newComment),
    onSuccess: (data) => {
      // TODO: Aquí debería invalidar el query que getea todos los comments
    },
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { createComment, isCreating };
}
