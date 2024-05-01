//TODO: Revisar si esto no abre una vulnerabilidad. Alguien puede GETear todos los usernames y POSTear en bulk requests. Con que uno lo acepte ya puede construir una red de cuentas.
import { useMutation } from "@tanstack/react-query";
import { requestAccount as requestAccountApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useRequestAccount() {
  const navigate = useNavigate();

  const { isLoading, mutate: requestAccount } = useMutation({
    mutationFn: ({ name, email, request, friendUsername }) =>
      requestAccountApi({ name, email, request, friendUsername }),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => navigate("/home", { replace: false }), 1000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, requestAccount };
}
