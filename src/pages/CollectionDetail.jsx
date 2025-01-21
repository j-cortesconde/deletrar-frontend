// FIXME: Como manejo la despublicacion de un texto incluido en una coleccion? Notificacion al colector? (esto ultimo 2.0)

import { longDate } from "../utils/dateFormat";
import { useNavigate, useParams } from "react-router-dom";

import { useCollection } from "../features/collections/useCollection";
import { useIsntOwnCollection } from "../features/collections/useIsntOwnCollection";
import { useErrorHandler } from "../hooks/useErrorHandler";

import CollectionOwnerOptions from "../features/collections/CollectionOwnerOptions";
import Loader from "../ui/Loader";
import PostCard from "../features/posts/PostCard";
import CollectionComments from "../features/comments/CollectionComments";
import LikeCommentShare from "../ui/LikeCommentShare";

function CollectionDetail() {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const { isLoading, collection, error } = useCollection(collectionId);
  useErrorHandler(error);

  const { isntOwnCollection, isLoggedIn } = useIsntOwnCollection(collection);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4">
      <div className="mb-10 flex items-center justify-center gap-10 border-b-2 border-stone-300 pb-4">
        <img
          src={collection?.coverImage}
          alt="Collection Cover"
          className="w-40"
        />

        <div className="max-w-[60%] flex-col text-justify">
          {collection?.status === "posted" && (
            <div>
              <span>Publicada por </span>
              <span
                onClick={() =>
                  navigate(`/user/${collection?.collector.username}`)
                }
                className="font-bold text-stone-900 hover:cursor-pointer"
              >
                {collection?.collector.name}
              </span>
              <span> el {longDate(collection?.postedAt)}</span>
            </div>
          )}

          <p className="flex-wrap whitespace-pre-wrap">{collection?.summary}</p>
        </div>

        {!isntOwnCollection && (
          <CollectionOwnerOptions collection={collection} />
        )}
      </div>

      <p className="m-6 text-6xl">{collection?.title}</p>

      <ul className="m-auto w-3/5">
        {collection?.posts?.map((post) => (
          <PostCard key={post._id} post={post} collectionId={collection._id} />
        ))}
      </ul>

      <LikeCommentShare
        docId={collectionId}
        docType="collection"
        isLoggedIn={isLoggedIn}
      />
      <CollectionComments collectionId={collectionId} />
    </div>
  );
}

export default CollectionDetail;
