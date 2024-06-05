import { useNavigate } from "react-router-dom";
import { longDate } from "../../utils/dateFormat";
import { useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentComments from "./CommentComments";

function CommentCard({ comment }) {
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  function handleShowReplies() {
    if (comment.replies > 0) setShowReplies((prev) => !prev);
  }

  return (
    <li className="relative m-4 select-none pl-2">
      <div
        className={`absolute bottom-0 left-0 top-10 z-0 border-l-2 border-stone-300`}
      ></div>
      <div className="flex gap-4">
        <img
          onClick={() => navigate(`/user/${comment.author.username}`)}
          className="h-20 w-20 rounded-full hover:cursor-pointer"
          src={`/users/${comment.author.photo}`}
          alt={comment.author.username}
        />

        <div>
          <p
            onClick={() => navigate(`/user/${comment.author.username}`)}
            className="text-left hover:cursor-pointer"
          >
            {comment.author.name}
            <span className="text-xl"> - {comment.author.username}</span>
          </p>
          {/* //TODO:CHANGE FORMAT */}
          {/* // TODO: Add redirect to comment specific view */}
          <p className="text-left text-xl">{longDate(comment.createdAt)}</p>
        </div>
      </div>

      <div className="mx-2 mb-2 pl-20">
        <p className="select-text break-words text-left">{comment.content}</p>
      </div>

      <div className="mx-2 flex gap-8 pl-20">
        <p
          onClick={handleShowReplies}
          className={`${comment.replies > 0 && "hover:cursor-pointer"}`}
        >
          {comment.replies} respuesta{comment.replies === 1 ? "" : "s"}
        </p>
        <p> - </p>
        <p
          onClick={() => setIsReplying((prev) => !prev)}
          className="hover:cursor-pointer"
        >
          Responder
        </p>
      </div>

      {isReplying && (
        <div className="ml-20">
          <CommentCreate
            replyingTo={comment._id}
            handleClose={() => setIsReplying(false)}
          />
        </div>
      )}

      <div className="pl-4">
        {comment.reply && !showReplies && (
          <CommentCard comment={comment.reply} />
        )}
        {showReplies && <CommentComments commentId={comment._id} />}
      </div>
    </li>
  );
}

export default CommentCard;
