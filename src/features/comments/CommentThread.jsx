// TODO: Seguir desde acá. Quizás que el isMainComment cambie el formateo.
import { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";

function CommentThread({ commentThread, mainComment }) {
  const lastItemRef = useRef(null);

  const fullCommentThread = commentThread?.slice();
  if (mainComment) fullCommentThread.push(mainComment);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [commentThread, mainComment]);

  return (
    <ul className="">
      {fullCommentThread?.map((comment, i) => (
        <CommentCard
          // Complex key so re-render on new CommentDetail so it will re-initialize states like showReply and showReplies which were causing issues
          key={`${comment?._id}${mainComment?._id}`}
          comment={comment}
          isMainComment={i === fullCommentThread.length - 1}
          isThreadComment={i === fullCommentThread.length - 1 ? false : true}
          liRef={i === fullCommentThread.length - 1 ? lastItemRef : null}
        />
      ))}
    </ul>
  );
}

export default CommentThread;
