// TODO: Ver cómo conjuga la visual cuando: Comentar Post, comentar Post de Coll, comentar Coll, comentar comment.
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";
import { useCreateComment } from "./useCreateComment";
import toast from "react-hot-toast";

function CommentCreate({ replyingTo }) {
  const { collectionId, postId } = useParams();
  const [isCommenting, setIsCommenting] = useState(false);
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
        setContent(undefined);
        setIsCommenting(false);
      },
    });
  }

  return (
    <div className="mx-auto w-3/4">
      {!isCommenting && (
        <div className="flex justify-end">
          <p
            className="inline underline underline-offset-2 hover:cursor-pointer"
            onClick={() => setIsCommenting(true)}
          >
            {replyingTo ? "Responder" : "Comentar"}
          </p>
        </div>
      )}
      {isCommenting && (
        <div className="m-2 flex w-3/4 flex-col gap-3 p-4">
          {/* // TODO: Must add max characters to match CommentModel */}
          <TextareaAutosize
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={4}
            className="resize-none rounded-xl border-2 border-black p-4 text-xl"
          />

          <div className="mx-4 flex justify-end gap-3">
            <Button disabled={isCreating} variation="danger">
              Cancelar
            </Button>
            <Button disabled={isCreating} onClick={handleSubmit}>
              Comentar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCreate;
