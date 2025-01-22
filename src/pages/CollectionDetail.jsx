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
      <img
        src={collection?.coverImage}
        alt="Collection Cover"
        className="object mx-auto my-3 h-96 min-w-[100%] max-w-full rounded-lg object-cover"
      />

      <div className="grid grid-cols-5 gap-4 border-b-2 border-stone-300 pb-4">
        <div className="col-span-3 col-start-2 flex justify-center">
          <div className="flex-col text-center">
            {collection?.postedAt && (
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
                <p> el {longDate(collection?.postedAt)}</p>
              </div>
            )}

            <p className="flex-wrap whitespace-pre-wrap">
              {collection?.summary}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-center">
          {!isntOwnCollection && (
            <CollectionOwnerOptions collection={collection} />
          )}
        </div>
      </div>

      <p className="m-6 text-6xl font-semibold">{collection?.title}</p>

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
