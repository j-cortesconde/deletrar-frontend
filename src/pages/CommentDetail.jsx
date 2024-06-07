//FIXME: How does one connect the images from the frontend to the backend?
// TODO: Should redirect to an error page that recieves as a prop an error message
// TODO: Should do this not only here. Also in other "if (error)" and many navigates that redirect home or elsewhere

import { useParams } from "react-router-dom";

import { useComment } from "../features/comments/useComment";
import { useCommentThread } from "../features/comments/useCommentThread";

import Loader from "../ui/Loader";
import CommentThread from "../features/comments/CommentThread";

function CommentDetail() {
  const { commentId } = useParams();

  const {
    isLoading: isLoading1,
    comment,
    error: error1,
  } = useComment(commentId);

  const {
    isLoading: isLoading2,
    commentThread,
    error: error2,
  } = useCommentThread(commentId);

  if (error1 || error2)
    return (
      <div>
        {error1?.message} {error2?.message}
      </div>
    );
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="mx-auto flex w-3/4 flex-col items-center">
      <CommentThread commentThread={commentThread} mainComment={comment} />
    </div>
  );
}

export default CommentDetail;
