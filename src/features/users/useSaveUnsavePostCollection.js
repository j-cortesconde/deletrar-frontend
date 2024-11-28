import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { saveUnsavePostCollection as saveUnsavePostCollectionApi } from "../../services/apiUsers";

export function useSaveUnsavePostCollection() {
  const queryClient = useQueryClient();

  const { isPending, mutate: saveUnsavePostCollection } = useMutation({
    // docType must be one of ['post', 'collection']
    mutationFn: ({ docId, docType, unsave }) =>
      saveUnsavePostCollectionApi({ docId, docType, unsave }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["haveSaved", data.docId],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });

      toast.success("Modificación exitosa.");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, saveUnsavePostCollection };
}
