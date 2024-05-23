import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCollectionPost as addCollectionPostAPI } from "../../services/apiCollections";

export function useAddCollectionPost() {
  const queryClient = useQueryClient();

  const { mutate: addCollectionPost, isPending: isAdding } = useMutation({
    mutationFn: ({ collectionId, postId, position }) =>
      addCollectionPostAPI(collectionId, postId, position),
    onSuccess: (data) => {
      toast.success("El texto fue agregado exitosamente");
      queryClient.setQueryData(["collection", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { addCollectionPost, isAdding };
}
