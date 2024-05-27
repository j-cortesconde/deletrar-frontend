import { useState } from "react";

import { useAddCollectionPost } from "./useAddCollectionPost";

import CollectionPostSearch from "../search/collection/CollectionPostSearch";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CollectionPostSelect({ handleClose }) {
  const queryClient = useQueryClient();
  const { collectionId } = useParams();

  const collection = queryClient.getQueryData(["collection", collectionId]);

  const [selectedPost, setSelectedPost] = useState();

  const { addCollectionPost, isAdding } = useAddCollectionPost();

  function handleConfirm() {
    if (collection?.posts?.some((post) => post._id === selectedPost._id)) {
      toast.error("Una colección no puede incluir dos veces el mismo texto");
      setSelectedPost(undefined);
      return;
    }

    addCollectionPost({ postId: selectedPost?._id });
    handleClose();
  }

  function handleCancel() {
    setSelectedPost(undefined);
  }

  if (isAdding) return <Loader />;

  return (
    <>
      {!selectedPost ? (
        <CollectionPostSearch handleSelect={setSelectedPost} />
      ) : (
        <div className="grid auto-rows-max items-center">
          <div className="mb-4">
            <p className="font-semibold">
              {selectedPost.title} - {selectedPost.author.name}
            </p>
            <p>{selectedPost.summary}</p>
          </div>
          <div className="flex h-auto justify-center gap-[20%]">
            <Button
              variation="danger"
              size="small"
              onClick={handleCancel}
              disabled={isAdding}
            >
              Cancelar
            </Button>
            <Button size="small" onClick={handleConfirm} disabled={isAdding}>
              Confirmar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CollectionPostSelect;
