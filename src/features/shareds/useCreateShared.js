import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createShared as createSharedAPI } from "../../services/apiShareds";
export function useCreateShared() {
  const { mutate: createShared, isPending: isCreating } = useMutation({
    mutationFn: (newShared) => createSharedAPI(newShared),
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { createShared, isCreating };
}
