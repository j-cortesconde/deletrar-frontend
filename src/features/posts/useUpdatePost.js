import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updatePost as updatePostAPI } from "../../services/apiPosts";

export function useUpdatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: ({ postId, newPost }) => updatePostAPI(postId, newPost),
    onSuccess: (data) => {
      toast.success("El texto fue guardado exitosamente");
      queryClient.setQueryData(["post", data._id], data);
      if (data.status === "posted") navigate(`/post/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePost, isUpdating };
}

export function useAutoSaveUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: ({ postId, newPost }) => updatePostAPI(postId, newPost),
    onSuccess: (data) => {
      queryClient.setQueryData(["post", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePost, isUpdating };
}
