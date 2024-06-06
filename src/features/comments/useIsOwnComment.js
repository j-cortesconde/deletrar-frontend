import { useQueryClient } from "@tanstack/react-query";

export function useIsOwnComment(authorUsername) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const isOwnComment = authorUsername === ownUser.username;

  return { isOwnComment };
}
