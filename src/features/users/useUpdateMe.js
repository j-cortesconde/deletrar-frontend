import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateMe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isUpdating, mutate: updateMe } = useMutation({
    mutationFn: (formData) => {
      return updateMeApi(formData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.setQueryData(["user", data?.username], data);
      toast.success("La información de tu cuenta ha sido actualizada.");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateMe };
}
