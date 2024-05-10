import { useNavigate } from "react-router-dom";
import { longDate } from "../../utils/dateFormat";

function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/post/${post._id}`)}
      className="m-5 rounded-md border-2 border-slate-400 bg-slate-300 hover:cursor-pointer"
    >
      <div className="my-8 flex items-center justify-end">
        <img
          src={`/posts/${post.coverImage}`}
          alt={`${post.title}'s cover`}
          className="max-w-[20%]"
        />
        <div className="mx-14 w-[60%] text-left">
          <p className="text-4xl font-semibold">{post.title}</p>
          {post.author?.name && (
            <p className="text-2xl">Un texto escrito por {post.author.name}</p>
          )}
          {post.postedAt && (
            <p className="text-2xl">Publicado el {longDate(post.postedAt)}</p>
          )}
          {post.updatedAt && (
            <p className="text-2xl">
              Actualizado el {longDate(post.updatedAt)}
            </p>
          )}
          <p className="text-2xl">{post.summary}</p>
        </div>
      </div>
    </li>
  );
}

export default PostCard;
