import { useState } from "react";

import { useRemoveCollectionPost } from "./useRemoveCollectionPost";

import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CollectionPostSelect from "./CollectionPostSelect";

function CollectionPostButtons({ postId, index }) {
  const [openModal, setOpenModal] = useState(false);
  const [newPostPosition, setNewPostPosition] = useState();

  const { removeCollectionPost, isRemoving } = useRemoveCollectionPost();

  function insertPost(position = 0) {
    setNewPostPosition(index + position);
    setOpenModal(true);
  }

  function closeModal() {
    setNewPostPosition(undefined);
    setOpenModal(false);
  }

  function handleRemove() {
    removeCollectionPost(postId);
  }

  if (isRemoving) return <Loader />;

  return (
    <>
      {openModal && (
        <Modal handleClose={closeModal}>
          <CollectionPostSelect
            newPostPosition={newPostPosition}
            handleClose={closeModal}
          />
        </Modal>
      )}

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <Button size="small" onClick={() => insertPost()}>
            + Anterior
          </Button>

          <Button size="small" onClick={() => insertPost(1)}>
            + Posterior
          </Button>
        </div>

        <div>
          <Button
            variation="danger"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            Quitar
          </Button>
        </div>
      </div>
    </>
  );
}

export default CollectionPostButtons;
