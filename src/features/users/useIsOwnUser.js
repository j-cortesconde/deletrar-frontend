import { useParams } from "react-router-dom";
import { useCurrentUser } from "./useCurrentUser";

export function useIsOwnUser() {
  const { username } = useParams();

  const { user: ownUser } = useCurrentUser();

  const isOwnUser = username === ownUser?.username;

  return { isOwnUser, username, ownUser };
}
