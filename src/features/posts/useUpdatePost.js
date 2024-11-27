import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updatePost as updatePostAPI } from "../../services/apiPosts";

export function useUpdatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: ({ postId, newPost, image }) => {
      const formData = new FormData();

      Object.entries(newPost).forEach(([key, value]) => {
        if (value && typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      formData.append("image", image);

      return updatePostAPI(postId, formData);
    },
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
    mutationFn: ({ postId, newPost }) => {
      const formData = new FormData();

      Object.entries(newPost).forEach(([key, value]) => {
        if (value && typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      return updatePostAPI(postId, formData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["post", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePost, isUpdating };
}
