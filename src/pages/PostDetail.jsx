//FIXME: How does one connect the images from the frontend to the backend?

import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/posts/usePost";
import HTMLParser from "../features/posts/HTMLParser";

function PostDetail() {
  const { postId } = useParams();

  const { isLoading, post, error } = usePost(postId);
  const navigate = useNavigate();

  if (isLoading) return <div>Wait</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-3/4">
      <div className="flex items-end justify-center gap-10">
        <img
          src={`/posts/${post.coverImage}`}
          alt="Post Cover"
          className="w-40"
        />
        <div className="w-1/2 flex-col text-left">
          <p>{post.title}</p>
          <p>
            Written by{" "}
            <span
              onClick={() => navigate(`/user/${post.author._id}`)}
              className="font-bold text-stone-900 hover:cursor-pointer"
            >
              {post.author.name}
            </span>
          </p>
          <p className="flex-wrap">{post.summary}</p>
        </div>
      </div>
      <HTMLParser delta={post.content} />
      <button onClick={() => navigate(`/post/write/${postId}`)}>Edit</button>
    </div>
  );
}

export default PostDetail;
