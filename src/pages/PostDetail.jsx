//FIXME: How does one connect the images from the frontend to the backend?
// TODO: Should redirect to an error page that recieves as a prop an error message
// TODO: Should do this not only here. Also in other "if (error)" and many navigates that redirect home or elsewhere

import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/posts/usePost";
import HTMLParser from "../features/posts/HTMLParser";
import { usePrivatePost } from "../features/posts/usePrivatePost";

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { isLoading, post, error } = usePost(postId);

  usePrivatePost(post);

  if (isLoading) return <div>Wait</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="mx-auto w-3/4">
      <div className="mt-4 flex items-end justify-center gap-10">
        <img
          src={`/posts/${post.coverImage}`}
          alt="Post Cover"
          className="w-40"
        />
        <div className="w-1/2 flex-col text-left">
          <p>{post.status}</p>
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
