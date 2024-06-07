import { useDeleteComment } from "./useDeleteComment";
import { useIsOwnComment } from "./useIsOwnComment";

import Loader from "../../ui/Loader";

function CommentOptions({
  comment,
  handleReply,
  handleShowReplies,
  isMainComment,
}) {
  const { isOwnComment, isLoggedIn } = useIsOwnComment(
    comment?.author.username,
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

      {isLoggedIn && (
        <>
          <p> - </p>
          <p onClick={handleReply} className="hover:cursor-pointer">
            Responder
          </p>
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
