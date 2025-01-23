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

      let docMessage;
      switch (data.docType) {
        case "post":
          docMessage = "el texto";
          break;
        case "collection":
          docMessage = "la colección";
          break;
        default:
          docMessage = "el documento";
          break;
      }

      let operationMessage;
      switch (data.operation) {
        case "save":
          operationMessage = "Se ha guardado";
          break;
        case "unsave":
          operationMessage = "Ya no se guarda más";
          break;
        default:
          operationMessage = "Se ha modificado";
          break;
      }

      toast.success(`${operationMessage} ${docMessage}`);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isPending, saveUnsavePostCollection };
}
