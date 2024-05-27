import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "./useCollection";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";

function CollectionNavigate() {
  const navigate = useNavigate();
  const { collectionId, postId } = useParams();

  const { isLoading, collection, error } = useCollection(collectionId);

  const postCollectionIndex = collection?.posts.findIndex(
    (post) => post._id === postId,
  );

  const previousCollectionPost =
    postCollectionIndex > 0
      ? collection?.posts[postCollectionIndex - 1]._id
      : null;

  const nextCollectionPost =
    postCollectionIndex < collection?.posts.length - 1
      ? collection?.posts[postCollectionIndex + 1]._id
      : null;

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loader />;

  return (
    <div className="mx-10 mb-5 grid grid-cols-3">
      {previousCollectionPost && (
        <div className="col-start-1 justify-self-start">
          <Button
            onClick={() =>
              navigate(
                `/collection/${collectionId}/post/${previousCollectionPost}`,
              )
            }
            variation="secondary"
          >
            Anterior
          </Button>
        </div>
      )}
      <div className="col-start-2">
        <Button
          onClick={() => navigate(`/collection/${collectionId}`)}
          variation="secondary"
        >
          Colección
        </Button>
      </div>

      {nextCollectionPost && (
        <div className="col-start-3 justify-self-end">
          <Button
            onClick={() =>
              navigate(`/collection/${collectionId}/post/${nextCollectionPost}`)
            }
            variation="secondary"
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
}

export default CollectionNavigate;
