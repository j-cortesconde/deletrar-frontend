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
      queryClient.setQueryData(["post", data._id], data);
      navigate(`/post/write/${data._id}`);
    },
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { createPost, isCreating };
}
