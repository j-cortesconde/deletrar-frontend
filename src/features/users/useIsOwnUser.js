import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useIsOwnUser() {
  const { username } = useParams();

  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const isOwnUser = username === ownUser?.username;

  return { isOwnUser, username, ownUser };
}
