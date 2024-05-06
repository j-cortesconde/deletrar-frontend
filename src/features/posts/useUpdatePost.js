import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePost as updatePostAPI } from "../../services/apiPosts";
import { useNavigate } from "react-router-dom";

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: ({ postId, newPost }) => updatePostAPI(postId, newPost),
    onSuccess: (data) => {
      toast.success("El texto fue guardado exitosamente");
      queryClient.setQueryData(["post", data._id], data);
      navigate(`/post/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePost, isUpdating };
}
