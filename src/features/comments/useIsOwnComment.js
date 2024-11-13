import { useQueryClient } from "@tanstack/react-query";

export function useIsOwnComment(authorUsername) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const isLoggedIn = !!ownUser;

  const isOwnComment = !!authorUsername && authorUsername === ownUser?.username;

  return { isOwnComment, isLoggedIn };
}
