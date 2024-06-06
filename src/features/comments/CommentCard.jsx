import { useState } from "react";

import { useIsOwnComment } from "./useIsOwnComment";
import { useDeleteComment } from "./useDeleteComment";

import CommentCreate from "./CommentCreate";
import CommentComments from "./CommentComments";
import Loader from "../../ui/Loader";
import CommentData from "./CommentData";
import CommentOptions from "./CommentOptions";

function CommentCard({ comment, isReply = false }) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  function handleShowReplies() {
    if (isReply && comment.replies > 0) setShowReplies((prev) => !prev);
    if (comment.replies > 1) setShowReplies((prev) => !prev);
  }

  return (
    <li className="relative m-4 select-none pl-2">
      <div
        className={`absolute bottom-0 left-0 top-10 z-0 border-l-2 border-stone-300`}
      ></div>

      <CommentData comment={comment} />

      <CommentOptions
        comment={comment}
        isReply={isReply}
        handleReply={() => setIsReplying((prev) => !prev)}
        handleShowReplies={handleShowReplies}
      />

      {isReplying && (
        <div className="ml-20">
          <CommentCreate
            replyingTo={comment._id}
            handleClose={() => setIsReplying(false)}
          />
        </div>
      )}

      <ul className="pl-4">
        {comment.reply && !showReplies && (
          <CommentCard comment={comment.reply} isReply={true} />
        )}
        {showReplies && <CommentComments commentId={comment._id} />}
      </ul>
    </li>
  );
}

export default CommentCard;
