import Loader from "../../ui/Loader";
import { useComments } from "./useComments";

function PostComments({ postId }) {
  const { comments, isLoading, count } = useComments({
    type: "post",
    id: postId,
  });

  //TODO: Should actually be a localized spinner
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4 border-2">
      {comments?.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostComments;
