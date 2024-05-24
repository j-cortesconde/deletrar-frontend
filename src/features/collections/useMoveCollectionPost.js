import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveCollectionPost as moveCollectionPostAPI } from "../../services/apiCollections";
import { useParams } from "react-router-dom";

export function useMoveCollectionPost() {
  const { collectionId } = useParams();

  const queryClient = useQueryClient();

  const { mutate: moveCollectionPost, isPending: isMoving } = useMutation({
    mutationFn: ({ postId, position }) =>
      moveCollectionPostAPI(collectionId, postId, position),
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { moveCollectionPost, isMoving };
}
