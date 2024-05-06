import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost as createPostAPI } from "../../services/apiPosts";
import { useNavigate } from "react-router-dom";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: (newPost) => createPostAPI(newPost),
    onSuccess: (data) => {
      toast.success("El texto fue creado exitosamente");
      queryClient.setQueryData(["post", data._id], data);
      navigate(`/post/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPost, isCreating };
}
