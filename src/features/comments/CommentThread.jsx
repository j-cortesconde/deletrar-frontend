// TODO: Seguir desde acá. Quizás que el isMainComment cambie el formateo.
import { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";

function CommentThread({ commentThread, mainComment }) {
  const lastItemRef = useRef(null);

  const reversedCommentThread = commentThread?.slice().reverse();
  if (mainComment) reversedCommentThread.push(mainComment);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [commentThread, mainComment]);

  return (
    <ul>
      {reversedCommentThread?.map((comment, i) => (
        <CommentCard
          // Complex key so re-render on new CommentDetail so it will re-initialize states like showReply and showReplies which were causing issues
          key={`${comment?._id}${mainComment?._id}`}
          comment={comment}
          isMainComment={i === reversedCommentThread.length - 1}
          isThreadComment={
            i === reversedCommentThread.length - 1 ? false : true
          }
          liRef={i === reversedCommentThread.length - 1 ? lastItemRef : null}
        />
      ))}
    </ul>
  );
}

export default CommentThread;
