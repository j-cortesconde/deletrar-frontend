import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initializeAccount as initializeAccountApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useInitializeAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: initializeAccount } = useMutation({
    mutationFn: ({ username }) => initializeAccountApi({ username }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Tu cuenta ya fue activada.");
      navigate("/user/settings", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, initializeAccount };
}
