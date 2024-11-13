import { useDeleteComment } from "./useDeleteComment";
import { useIsOwnComment } from "./useIsOwnComment";

import Loader from "../../ui/Loader";
import ShareModal from "../shareds/ShareModal";

// TODO: Maybe one day add functionality here and in BE so that post/collection/replyingTo document owner can delete
function CommentOptions({
  comment,
  handleReply,
  handleShowReplies,
  isMainComment,
}) {
  const { isOwnComment, isLoggedIn } = useIsOwnComment(
    comment?.author?.username,
  );
  const { deleteComment, isDeleting } = useDeleteComment();

  // FIXME: This and all deletes should ask confirmation
  function handleDelete() {
    deleteComment(comment?._id);
  }

  //TODO: Should be a localized spinner
  if (isDeleting) return <Loader />;

  return (
    <div
      className={`mx-2 flex gap-8 ${isMainComment ? "pl-2 text-3xl" : "pl-20"}`}
    >
      <p
        onClick={handleShowReplies}
        className={`${comment?.replies > 0 && "hover:cursor-pointer"}`}
      >
        {comment?.replies} respuesta{comment?.replies === 1 ? "" : "s"}
      </p>

      <p> - </p>
      <p onClick={handleReply} className="hover:cursor-pointer">
        Responder
      </p>

      {isLoggedIn && (
        <>
          <p> - </p>
          <ShareModal sharedComment={comment._id}>
            <p className="hover:cursor-pointer">Compartir</p>
          </ShareModal>
        </>
      )}

      {isOwnComment && (
        <>
          <p> - </p>
          <p onClick={handleDelete} className="hover:cursor-pointer">
            Eliminar
          </p>
        </>
      )}
    </div>
  );
}

export default CommentOptions;
