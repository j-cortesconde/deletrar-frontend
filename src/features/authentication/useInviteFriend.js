import { useMutation } from "@tanstack/react-query";
import { inviteFriend as inviteFriendApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useInviteFriend() {
  const navigate = useNavigate();

  const { isLoading, mutate: inviteFriend } = useMutation({
    mutationFn: ({ name, email }) => inviteFriendApi({ name, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, inviteFriend };
}
