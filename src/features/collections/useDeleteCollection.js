import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateCollection as updateCollectionAPI } from "../../services/apiCollections";

export function useDeleteCollection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const collection = { status: "deleted" };

  const { mutate: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: (collectionId) => updateCollectionAPI(collectionId, collection),
    onSuccess: (data) => {
      toast.success("La colección fue eliminada exitosamente");
      queryClient.removeQueries(["collection", data._id]);
      navigate("/home", { replace: true });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteCollection, isDeleting };
}
