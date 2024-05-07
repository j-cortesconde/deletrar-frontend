// TODO: Should actually redirect to error page (that take in as prop an err.message)
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useIsOwnPost(post) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const isntOwnPost = post?.author._id && post?.author._id !== user?._id;

  useEffect(() => {
    if (isntOwnPost) navigate("/home", { replace: true });
  }, [isntOwnPost, navigate]);
}
