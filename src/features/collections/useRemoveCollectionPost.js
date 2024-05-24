import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { removeCollectionPost as removeCollectionPostAPI } from "../../services/apiCollections";

export function useRemoveCollectionPost() {
  const { collectionId } = useParams();

  const queryClient = useQueryClient();

  const { mutate: removeCollectionPost, isPending: isRemoving } = useMutation({
    mutationFn: (postId) => removeCollectionPostAPI(collectionId, postId),
    onSuccess: (data) => {
      toast.success("El texto fue quitado exitosamente");
      queryClient.setQueryData(["collection", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeCollectionPost, isRemoving };
}
