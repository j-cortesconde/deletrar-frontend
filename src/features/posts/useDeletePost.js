import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updatePost as updatePostAPI } from "../../services/apiPosts";

export function useDeletePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const post = { status: "deleted" };

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: (postId) => updatePostAPI(postId, post),
    onSuccess: (data) => {
      toast.success("El texto fue eliminado exitosamente");
      queryClient.removeQueries(["post", data._id]);
      navigate("/home", { replace: true });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deletePost, isDeleting };
}
