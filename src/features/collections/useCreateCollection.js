import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCollection as createCollectionAPI } from "../../services/apiCollections";
import { useNavigate } from "react-router-dom";

export function useCreateCollection() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createCollection, isPending: isCreating } = useMutation({
    mutationFn: (newCollection) => {
      const formData = new FormData();

      Object.entries(newCollection).forEach(([key, value]) => {
        // The way of adding the elements from the posts array
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item._id);
          });

          // The way of adding all other properties (which aren't nested)
        } else {
          formData.append(key, value);
        }
      });

      return createCollectionAPI(formData);
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data._id], data);
      navigate(`/collection/create/${data._id}`);
    },
    onError: (err) =>
      toast.error("Hubo algún problema. Volvé a intentarlo más tarde."),
  });

  return { createCollection, isCreating };
}
