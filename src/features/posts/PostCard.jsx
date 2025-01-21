import { useNavigate } from "react-router-dom";
import { longDate, shortDate } from "../../utils/dateFormat";
import DeletedPost from "./DeletedPost";

function PostCard({ post, collectionId, shouldBePosted = true }) {
  const navigate = useNavigate();

  let statusMessage;

  switch (post.status) {
    case "posted":
      statusMessage = "";
      break;
    case "deleted":
      statusMessage = "[eliminado]";
      break;
    case "editing":
      statusMessage = "[editando]";
      break;
    default:
      statusMessage = "[inédito]";
      break;
  }

  const navigateLink = collectionId
    ? `/collection/${collectionId}/post/${post._id}`
    : `/post/${post._id}`;

  if (!(post.status === "posted") && shouldBePosted) return <DeletedPost />;

  return (
    <li
      onClick={() => navigate(navigateLink)}
      className={`my-6 select-none break-inside-avoid hyphens-auto break-words rounded-md border-2 border-neutral-400 bg-white hover:cursor-pointer`}
    >
      {/* <div className="my-8 flex items-start justify-center"> */}
      <div className="mx-6 my-4 flex flex-col items-center gap-4 text-center">
        <div>
          <p className="break-words text-4xl font-semibold underline">
            {post.title} {statusMessage}
          </p>
          {post.author?.name && (
            <p className="text-2xl">
              Un texto escrito por{" "}
              <span className="font-semibold">{post.author.name}</span>
            </p>
          )}
          <p className="text-2xl">
            {post.postedAt
              ? `Publicado el ${longDate(post.postedAt)}`
              : "Texto inédito"}
          </p>

          {post.updatedAt && post.updatedAt !== post.postedAt && (
            <p className="text-xl">
              (Actualizado el {shortDate(post.updatedAt)})
            </p>
          )}
        </div>

        <img
          src={post.coverImage}
          alt={`${post.title}'s cover`}
          className="max-h-40 w-full overflow-hidden object-cover"
        />

        <p className="mt-1 flex-wrap whitespace-pre-wrap text-2xl">
          {post.summary}
        </p>
      </div>
    </li>
  );
}

export default PostCard;
