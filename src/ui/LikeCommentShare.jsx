import { useState } from "react";
import {
  FaRegComment,
  FaComment,
  FaRegBookmark,
  FaBookmark,
  FaRegShareSquare,
  FaShareSquare,
} from "react-icons/fa";

import { useSaveUnsavePostCollection } from "../features/users/useSaveUnsavePostCollection";

import CommentCreate from "../features/comments/CommentCreate";
import Loader from "./Loader";
import { useHaveSaved } from "../features/users/useHaveSaved";

// docType must be one of ['post', 'collection']
function LikeCommentShare({ docId, docType }) {
  const [isCommenting, setIsCommenting] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const { isPending, saveUnsavePostCollection } = useSaveUnsavePostCollection();
  const { isLoading, haveSaved, error } = useHaveSaved(docId, docType);

  function handleSaveUnsave() {
    saveUnsavePostCollection({ docId, docType, unsave: haveSaved });
  }

  // TODO: Should be localized on save
  if (isPending || isLoading) return <Loader />;

  return (
    <div className="mx-auto my-2 w-3/4 select-none">
      <div className="grid grid-cols-3 bg-slate-300 px-8">
        <div
          className="flex items-center gap-2 place-self-center hover:cursor-pointer"
          onClick={handleSaveUnsave}
        >
          {haveSaved ? <FaBookmark /> : <FaRegBookmark />}
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
