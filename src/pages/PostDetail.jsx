//FIXME: How does one connect the images from the frontend to the backend?
// TODO: Should redirect to an error page that recieves as a prop an error message
// TODO: Should do this not only here. Also in other "if (error)" and many navigates that redirect home or elsewhere

import { longDate } from "../utils/dateFormat";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/posts/usePost";

import HTMLParser from "../features/posts/HTMLParser";
import PostOwnerOptions from "../features/posts/PostOwnerOptions";
import { useIsntOwnPost } from "../features/posts/useIsntOwnPost";
import Loader from "../ui/Loader";

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { isLoading, post, error } = usePost(postId);

  const isntOwnPost = useIsntOwnPost(post);
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4">
      <div className="flex items-center justify-center gap-10 pb-4">
        <img
          src={`/posts/${post?.coverImage}`}
          alt="Post Cover"
          className="w-40"
        />

        <div className="max-w-[60%] flex-col text-left">
          {post?.status === "posted" && (
            <div>
              <span>Publicado por </span>
              <span
                onClick={() => navigate(`/user/${post?.author._id}`)}
                className="font-bold text-stone-900 hover:cursor-pointer"
              >
                {post?.author.name}
              </span>
              <span> el {longDate(post?.postedAt)}</span>
            </div>
          )}

          <p className="flex-wrap">{post?.summary}</p>
        </div>

        {!isntOwnPost && <PostOwnerOptions post={post} />}
      </div>
      <HTMLParser delta={post?.content} title={post?.title} />
    </div>
  );
}

export default PostDetail;
