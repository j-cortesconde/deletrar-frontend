// TODO: Should actually redirect to error page (that take in as prop an err.message)
import { useQueryClient } from "@tanstack/react-query";

export function useIsntOwnPost(post) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const isntOwnPost =
    post?.author.username && post?.author.username !== user?.username;

  return isntOwnPost;
}
