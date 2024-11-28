import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useForgotPassword() {
  const navigate = useNavigate();

  const { isPending, mutate: forgotPassword } = useMutation({
    mutationFn: ({ email }) => forgotPasswordApi({ email }),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => navigate("/home", { replace: false }), 1000);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, forgotPassword };
}

export default useForgotPassword;
