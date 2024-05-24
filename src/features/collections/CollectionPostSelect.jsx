import { useState } from "react";

import { useAddCollectionPost } from "./useAddCollectionPost";

import CollectionPostSearch from "../search/collection/CollectionPostSearch";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";

function CollectionPostSelect({ handleClose }) {
  const [selectedPost, setSelectedPost] = useState();

  const { addCollectionPost, isAdding } = useAddCollectionPost();

  function handleConfirm() {
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
