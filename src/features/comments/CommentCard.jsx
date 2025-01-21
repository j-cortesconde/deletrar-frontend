// TODO: Perhaps add a distinctive if the commenter is also the author
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CommentCreate from "./CommentCreate";
import CommentComments from "./CommentComments";
import CommentData from "./CommentData";
import CommentOptions from "./CommentOptions";
import MainCommentData from "./MainCommentData";
import DeletedComment from "./DeletedComment";

function CommentCard({
  comment,
  isReply = false,
  isMainComment = false,
  isThreadComment = false,
  liRef,
}) {
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(isMainComment);
  const [showReply, setShowReply] = useState(
    !isReply && !isMainComment && comment.reply,
  );

  function handleAddReply() {
    if (isThreadComment) return navigate(`/comment/${comment._id}`);
    setShowReply(false);
    setShowReplies(true);
  }

  function handleShowReplies() {
    if (isThreadComment) return navigate(`/comment/${comment._id}`);
    if (comment.replies === 0) return;
    if (comment.replies === 1 && !isReply && !isMainComment)
      setShowReply((prev) => !prev);
    else {
      setShowReply(false);
      setShowReplies((prev) => !prev);
    }
  }

  if (comment.status !== "posted" && isThreadComment) return <DeletedComment />;

  return (
    <li ref={liRef} className="relative m-4 max-w-full select-none pl-2">
      <div
        className={`absolute bottom-0 left-0 z-0 border-l-2 ${isMainComment ? "top-14 border-stone-400" : "top-10 border-stone-300"}`}
      ></div>

      {isMainComment ? (
        <MainCommentData comment={comment} />
      ) : (
        <CommentData comment={comment} />
      )}

      <CommentOptions
        comment={comment}
        handleReply={() => setIsReplying((prev) => !prev)}
        handleShowReplies={handleShowReplies}
        isMainComment={isMainComment}
      />

      {isReplying && (
        <div className="ml-20">
          <CommentCreate
            repliedComment={comment}
            handleClose={() => setIsReplying(false)}
            handleCreate={handleAddReply}
          />
        </div>
      )}

      <div className="pl-4">
        {showReply && !showReplies && (
          <CommentCard comment={comment.reply} isReply={true} />
        )}

        {showReplies && !showReply && (
          <CommentComments commentId={comment._id} />
        )}
      </div>
    </li>
  );
}

export default CommentCard;
