import { useRemoveCollectionPost } from "./useRemoveCollectionPost";

import Loader from "../../ui/Loader";
import Button from "../../ui/Button";

function RemoveCollectionPostButton({ postId, index }) {
  const { removeCollectionPost, isRemoving } = useRemoveCollectionPost();

  function handleRemove() {
    removeCollectionPost(postId);
  }

  if (isRemoving) return <Loader />;

  return (
    <Button variation="danger" onClick={handleRemove} disabled={isRemoving}>
      Quitar
    </Button>
  );
}

export default RemoveCollectionPostButton;
