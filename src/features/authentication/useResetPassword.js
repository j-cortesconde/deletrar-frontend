import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: resetPassword } = useMutation({
    mutationFn: ({ password, passwordConfirm, token }) =>
      resetPasswordApi({ password, passwordConfirm, token }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Contraseña actualizada");
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, resetPassword };
}
