// TODO: Shouldnt I handle useDeletePost the same way I handle useUndeletePost?
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updatePost as updatePostAPI } from "../../services/apiPosts";

export function useUndeletePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const post = { status: "editing" };

  const { mutate: undeletePost, isPending: isUndeleting } = useMutation({
    mutationFn: (postId) => updatePostAPI(postId, post),
    onSuccess: (data) => {
      toast.success("El texto fue recuperado exitosamente");
      queryClient.setQueryData(["post", data._id], data);
      navigate(`/post/write/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { undeletePost, isUndeleting };
}
