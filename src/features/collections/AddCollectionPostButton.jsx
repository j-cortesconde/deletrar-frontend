import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CollectionPostSelect from "./CollectionPostSelect";

function AddCollectionPostButton() {
  const [openModal, setOpenModal] = useState(false);

  function addPost() {
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <>
      {openModal && (
        <Modal handleClose={closeModal}>
          <CollectionPostSelect handleClose={closeModal} />
        </Modal>
      )}
      <div className="mx-2 flex justify-end">
        <Button onClick={addPost}>Agregar Texto</Button>
      </div>
    </>
  );
}

export default AddCollectionPostButton;
