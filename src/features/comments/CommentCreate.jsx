// TODO: Ver cómo conjuga la visual cuando: Comentar Post, comentar Post de Coll, comentar Coll, comentar comment.
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";
import { useCreateComment } from "./useCreateComment";
import toast from "react-hot-toast";

function CommentCreate({ replyingTo, handleClose }) {
  const { collectionId, postId } = useParams();
  const [content, setContent] = useState();

  const { createComment, isCreating } = useCreateComment();

  function handleSubmit() {
    if (!content) {
      return toast.error("No se puede guardar un comentario vacío");
    }

    const newComment = {
      content,
      replyingTo,
      targetCollection: collectionId,
      targetPost: postId,
    };

    createComment(newComment, {
      onSuccess: () => {
        handleClose();
      },
    });
  }

  function handleCancel() {
    handleClose();
  }

  return (
    <div className="flex w-3/4 flex-col gap-3 p-4">
      <TextareaAutosize
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        minRows={4}
        maxLength={400}
        className="resize-none rounded-xl border-2 border-black p-4 text-xl"
      />

      <div className="mx-4 flex justify-end gap-3">
        <Button disabled={isCreating} onClick={handleCancel} variation="danger">
          Cancelar
        </Button>
        <Button disabled={isCreating} onClick={handleSubmit}>
          Comentar
        </Button>
      </div>
    </div>
  );
}

export default CommentCreate;
