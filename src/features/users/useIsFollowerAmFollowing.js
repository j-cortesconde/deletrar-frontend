import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  amFollowing as amFollowingApi,
  isFollower as isFollowerApi,
} from "../../services/apiUsers";

export function useIsFollowerAmFollowing(otherUsername) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const ownUsername = ownUser?.username;

  const {
    isLoading: isLoading1,
    data: isFollower,
    error: error1,
  } = useQuery({
    queryKey: ["isFollower", otherUsername],
    queryFn: () => isFollowerApi(ownUsername, otherUsername),
  });

  const {
    isLoading: isLoading2,
    data: amFollowing,
    error: error2,
  } = useQuery({
    queryKey: ["amFollowing", otherUsername],
    queryFn: () => amFollowingApi(ownUsername, otherUsername),
  });

  const error = error1 || error2;
  const isLoading = isLoading1 || isLoading2;

  return { isLoading, error, amFollowing, isFollower };
}
