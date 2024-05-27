import { useNavigate } from "react-router-dom";
import { longDate, shortDate } from "../../utils/dateFormat";

function PostCard({ post, collectionId }) {
  const navigate = useNavigate();

  const navigateLink = collectionId
    ? `/collection/${collectionId}/post/${post._id}`
    : `/post/${post._id}`;

  return (
    <li
      onClick={() => navigate(navigateLink)}
      className="m-5 rounded-md border-2 border-slate-400 bg-slate-300 hover:cursor-pointer"
    >
      <div className="my-8 flex items-start justify-center">
        <img
          src={`/posts/${post.coverImage}`}
          alt={`${post.title}'s cover`}
          className="max-w-[20%]"
        />
        <div className="mx-6 w-[60%] text-left">
          <p className="text-4xl font-semibold">{post.title}</p>
          {post.author?.name && (
            <p className="mt-1 text-2xl">
              Un texto escrito por {post.author.name}
            </p>
          )}
          <p className="mt-1 text-2xl">
            {post.postedAt
              ? `Publicado el ${longDate(post.postedAt)}`
              : "Texto inédito"}
          </p>

          {post.updatedAt && post.updatedAt !== post.postedAt && (
            <p className="text-xl">
              (Actualizado el {shortDate(post.updatedAt)})
            </p>
          )}
          <p className="mt-1 text-2xl">{post.summary}</p>
        </div>
      </div>
    </li>
  );
}

export default PostCard;
