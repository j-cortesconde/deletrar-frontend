import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "./useCollection";
import Loader from "../../ui/Loader";
import { BiDownArrow, BiLeftArrow, BiRightArrow } from "react-icons/bi";

function CollectionNavigate() {
  const navigate = useNavigate();
  const { collectionId, postId } = useParams();

  const { isLoading, collection, error } = useCollection(collectionId);

  const postCollectionIndex = collection?.posts?.findIndex(
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
        <div className="col-start-1 flex items-center justify-start">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={() =>
              navigate(
                `/collection/${collectionId}/post/${previousCollectionPost}`,
              )
            }
          >
            <BiLeftArrow />
            <p>Anterior</p>
          </div>
        </div>
      )}

      {collection && (
        <div
          className="col-start-2 flex items-center place-self-center"
          onClick={() => navigate(`/collection/${collectionId}`)}
        >
          <div className="flex items-center gap-1 hover:cursor-pointer">
            <BiDownArrow />
            <p>Colección</p>
          </div>
        </div>
      )}

      {nextCollectionPost && (
        <div className="col-start-3 flex items-center justify-end">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={() =>
              navigate(`/collection/${collectionId}/post/${nextCollectionPost}`)
            }
          >
            <p>Siguiente</p>
            <BiRightArrow />
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionNavigate;
