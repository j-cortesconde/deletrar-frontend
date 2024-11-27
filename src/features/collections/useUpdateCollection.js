import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateCollection as updateCollectionAPI } from "../../services/apiCollections";

export function useUpdateCollection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ collectionId, newCollection, image }) => {
      const formData = new FormData();

      Object.entries(newCollection).forEach(([key, value]) => {
        // The way of adding the elements from the posts array
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item._id || item);
          });

          // The way of adding all other properties (which aren't nested)
        } else {
          formData.append(key, value);
        }
      });

      formData.append("image", image);

      return updateCollectionAPI(collectionId, formData);
    },
    onSuccess: (data) => {
      toast.success("La colección fue guardada exitosamente");
      queryClient.setQueryData(["collection", data._id], data);
      if (data.status === "posted") navigate(`/collection/${data._id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCollection, isUpdating };
}

export function useAutoSaveUpdateCollection() {
  const queryClient = useQueryClient();

  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ collectionId, newCollection }) => {
      const formData = new FormData();

      Object.entries(newCollection).forEach(([key, value]) => {
        // The way of adding the elements from the posts array
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item._id || item);
          });

          // The way of adding all other properties (which aren't nested)
        } else {
          formData.append(key, value);
        }
      });

      return updateCollectionAPI(collectionId, formData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", data._id], data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCollection, isUpdating };
}
