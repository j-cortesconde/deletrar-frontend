import { useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { useRemoveCollectionPost } from "./useRemoveCollectionPost";
import Loader from "../../ui/Loader";
import { useState } from "react";
import Modal from "../../ui/Modal";

function CollectionPostButtons({ postId, index }) {
  const { collectionId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const { removeCollectionPost, isRemoving } = useRemoveCollectionPost();

  function handleRemove() {
    removeCollectionPost({ collectionId, postId });
  }

  if (isRemoving) return <Loader />;

  return (
    <>
      {openModal && (
        <Modal handleClose={() => setOpenModal(false)}>
          <p>Hola! Soy una ventana modal</p>
        </Modal>
      )}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <Button size="small" onClick={() => setOpenModal(true)}>
            + Anterior
          </Button>
          <Button size="small">+ Posterior</Button>
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
