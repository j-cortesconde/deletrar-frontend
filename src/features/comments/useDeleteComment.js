import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateComment as updateCommentAPI } from "../../services/apiComments";
export function useDeleteComment() {
  const queryClient = useQueryClient();

  const comment = { status: "deleted" };

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (commentId) => updateCommentAPI(commentId, comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { deleteComment, isDeleting };
}
