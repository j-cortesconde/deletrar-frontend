import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCollection as createCollectionAPI } from "../../services/apiCollections";
import { useNavigate } from "react-router-dom";

export function useCreateCollection() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createCollection, isPending: isCreating } = useMutation({
    mutationFn: (newCollection) => createCollectionAPI(newCollection),
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data._id], data);
      navigate(`/collection/create/${data._id}`);
    },
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { createCollection, isCreating };
}
