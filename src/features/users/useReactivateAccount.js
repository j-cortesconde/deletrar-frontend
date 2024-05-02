import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactivateAccount as reactivateAccountApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useReactivateAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: reactivateAccount } = useMutation({
    mutationFn: () => reactivateAccountApi(),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Tu cuenta fue reactivada.");
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, reactivateAccount };
}
