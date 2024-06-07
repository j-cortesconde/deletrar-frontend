import { useState } from "react";
import {
  FaRegComment,
  FaComment,
  FaRegBookmark,
  FaBookmark,
  FaRegShareSquare,
  FaShareSquare,
} from "react-icons/fa";

import CommentCreate from "../comments/CommentCreate";

function LikeCommentShare() {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  return (
    <div className="mx-auto my-2 w-3/4 select-none">
      <div className="grid grid-cols-3 bg-slate-300 px-8">
        <div
          className="flex items-center gap-2 place-self-center hover:cursor-pointer"
          onClick={() => setIsLiked((prev) => !prev)}
        >
          {isLiked ? <FaBookmark /> : <FaRegBookmark />}
          <p>Guardar</p>
        </div>

        <div
          className="flex items-center gap-2 place-self-center hover:cursor-pointer"
          onClick={() => setIsCommenting((prev) => !prev)}
        >
          {isCommenting ? <FaComment /> : <FaRegComment />}
          <p>Comentar</p>
        </div>

        <div
          className="flex items-center gap-2 place-self-center hover:cursor-pointer"
          onClick={() => setIsShared((prev) => !prev)}
        >
          {isShared ? <FaShareSquare /> : <FaRegShareSquare />}
          <p>Compartir</p>
        </div>
      </div>

      {isCommenting && (
        <div className="flex justify-center">
          <CommentCreate handleClose={() => setIsCommenting(false)} />
        </div>
      )}
    </div>
  );
}

export default LikeCommentShare;
