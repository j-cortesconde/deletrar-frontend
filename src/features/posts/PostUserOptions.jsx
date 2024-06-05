import { useState } from "react";
import CommentCreate from "../comments/CommentCreate";

function PostUserOptions() {
  const [isCommenting, setIsCommenting] = useState(false);
  return (
    <div className="mx-auto my-2 w-3/4">
      <div className="grid grid-cols-3 bg-indigo-300 px-8">
        <p>Like</p>
        <div>
          <p
            className="hover:cursor-pointer"
            onClick={() => setIsCommenting(true)}
          >
            Comentar
          </p>
        </div>
        <p>Share</p>
      </div>
      {isCommenting && (
        <div className="flex justify-center">
          <CommentCreate handleClose={() => setIsCommenting(false)} />
        </div>
      )}
    </div>
  );
}

export default PostUserOptions;
