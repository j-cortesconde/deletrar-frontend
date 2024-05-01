import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useForgotPassword() {
  const navigate = useNavigate();

  const { isLoading, mutate: forgotPassword } = useMutation({
    mutationFn: ({ email }) => forgotPasswordApi({ email }),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => navigate("/home", { replace: false }), 1000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, forgotPassword };
}

export default useForgotPassword;
