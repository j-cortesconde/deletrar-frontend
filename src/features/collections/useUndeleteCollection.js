import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateCollection as updateCollectionAPI } from "../../services/apiCollections";

export function useUndeleteCollection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const collection = { status: "editing" };

  const { mutate: undeleteCollection, isPending: isUndeleting } = useMutation({
    mutationFn: (collectionId) => updateCollectionAPI(collectionId, collection),
    onSuccess: (data) => {
      toast.success("La colección fue recuperada exitosamente");
      queryClient.setQueryData(["collection", data._id], data);
      navigate(`/collection/create/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { undeleteCollection, isUndeleting };
}
