import { useMutation } from "@tanstack/react-query";
import { inviteFriend as inviteFriendApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useInviteFriend() {
  const { isPending, mutate: inviteFriend } = useMutation({
    mutationFn: ({ name, email }) => inviteFriendApi({ name, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, inviteFriend };
}
