import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateCollection as updateCollectionAPI } from "../../services/apiCollections";

export function useUpdateCollection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ collectionId, newCollection }) =>
      updateCollectionAPI(collectionId, newCollection),
    onSuccess: (data) => {
      toast.success("La colección fue guardada exitosamente");
      queryClient.setQueryData(["collection", data._id], data);
      if (data.status === "shared") navigate(`/collection/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCollection, isUpdating };
}

export function useAutoSaveUpdateCollection() {
  const queryClient = useQueryClient();

  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ collectionId, newCollection }) =>
      updateCollectionAPI(collectionId, newCollection),
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCollection, isUpdating };
}
