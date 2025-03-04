import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate(-1, { replace: true });
    },
    onError: (err) => {
      toast.error("Tus credenciales de inicio de sesión son incorrectas.");
    },
  });

  return { isPending, login };
}
