import { useNavigate } from "react-router-dom";
import { longDate, shortDate } from "../../utils/dateFormat";
import DeletedPost from "./DeletedPost";

function PostCard({ post, collectionId, shouldBePosted = true }) {
  const navigate = useNavigate();

  const navigateLink = collectionId
    ? `/collection/${collectionId}/post/${post._id}`
    : `/post/${post._id}`;

  const statusStyle = {
    posted: "border-slate-400 bg-slate-300",
    editing: "border-amber-400 bg-amber-300",
    deleted: "border-red-400 bg-red-300",
  };

  if (!(post.status === "posted") && shouldBePosted) return <DeletedPost />;

  return (
    <li
      onClick={() => navigate(navigateLink)}
      className={`m-5 select-none break-words rounded-md border-2 hover:cursor-pointer ${statusStyle[post.status || "posted"]}`}
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
