import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateAccount as deactivateAccountApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeactivateAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: deactivateAccount } = useMutation({
    mutationFn: () => deactivateAccountApi(),
    onSuccess: () => {
      queryClient.resetQueries();
      toast.success("Tu cuenta fue desactivada.");
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, deactivateAccount };
}
