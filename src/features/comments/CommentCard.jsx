// TODO: Must find a way to display the reply that's just been left on a comment

import { useState } from "react";

import CommentCreate from "./CommentCreate";
import CommentComments from "./CommentComments";
import CommentData from "./CommentData";
import CommentOptions from "./CommentOptions";

function CommentCard({ comment, isReply = false }) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReply, setShowReply] = useState(!isReply && comment.reply);

  function handleShowReplies() {
    if (comment.replies === 0) return;
    if (comment.replies === 1 && !isReply) setShowReply((prev) => !prev);
    else {
      setShowReply(false);
      setShowReplies((prev) => !prev);
    }
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
        {showReply && <CommentCard comment={comment.reply} isReply={true} />}
        {showReplies && <CommentComments commentId={comment._id} />}
      </ul>
    </li>
  );
}

export default CommentCard;
