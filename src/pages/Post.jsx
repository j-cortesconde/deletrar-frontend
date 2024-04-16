//FIXME: How does one connect the images from the frontend to the backend?

import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/posts/usePost";

export function Post() {
  const { postId } = useParams();

  const { isLoading, post, error } = usePost(postId);
  const navigate = useNavigate();

  if (isLoading) return <div>Wait</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <img
            src={`/public/posts/${post.coverImage}`}
            alt="Post Cover"
            className="w-40"
          />
        </div>
        <div className="flex-col">
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
        </div>
      </div>
      <p>{post.content}</p>
    </>
  );
}
