import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser as followUnfollowUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollowUnfollowUser() {
  const queryClient = useQueryClient();

  const { isPending, mutate: followUnfollowUser } = useMutation({
    mutationFn: ({ username, unfollow }) =>
      followUnfollowUserApi({ username, unfollow }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["followers", data.otherUsername],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["amFollowing", data.otherUsername],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["user", data.otherUsername],
        refetchType: "all",
      });

      toast.success("El cambio fue exitoso.");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, followUnfollowUser };
}
