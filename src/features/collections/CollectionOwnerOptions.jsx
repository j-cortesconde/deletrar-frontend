import { useNavigate } from "react-router-dom";
import { useUndeleteCollection } from "./useUndeleteCollection";

import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import StatusSign from "../../ui/StatusSign";

function CollectionOwnerOptions({ collection }) {
  const navigate = useNavigate();
  const { undeleteCollection, isUndeleting } = useUndeleteCollection();

  function handleClick() {
    if (collection.status === "deleted") {
      undeleteCollection(collection._id);
    } else {
      navigate(`/collection/create/${collection._id}`);
    }
  }

  return (
    <>
      {isUndeleting && <Loader />}
      <div className="flex flex-col">
        <StatusSign status={collection?.status} />
        <Button size="small" variation="secondary" onClick={handleClick}>
          {collection?.status === "deleted" ? "Recuperar" : "Editar"}
        </Button>
      </div>
    </>
  );
}

export default CollectionOwnerOptions;
