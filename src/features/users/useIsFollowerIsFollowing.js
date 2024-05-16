import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  isFollowing as isFollowingAPI,
  isFollower as isFollowerAPI,
} from "../../services/apiUsers";

export function useIsFollowingIsFollower(otherUsername) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const ownUsername = ownUser?.username;

  const {
    isLoading: isLoading1,
    data: isFollowing,
    error: error1,
  } = useQuery({
    queryKey: ["isFollowing", ownUsername, otherUsername],
    queryFn: () => isFollowingAPI(ownUsername, otherUsername),
  });

  const {
    isLoading: isLoading2,
    data: isFollower,
    error: error2,
  } = useQuery({
    queryKey: ["isFollower", ownUsername, otherUsername],
    queryFn: () => isFollowerAPI(ownUsername, otherUsername),
  });

  const error = error1 || error2;
  const isLoading = isLoading1 || isLoading2;

  return { isLoading, error, isFollowing, isFollower };
}
