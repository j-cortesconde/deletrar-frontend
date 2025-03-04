import { Link, useNavigate } from "react-router-dom";
import { dateDistance } from "../../utils/dateFormat";
import TruncatedText from "../../ui/TruncatedText";
import { Tooltip } from "react-tooltip";

function FeedComment({ comment }) {
  const navigate = useNavigate();
  const isAnonymousComment = !comment?.author;

  if (comment?.status !== "posted") {
    return (
      <div className="w-full rounded-lg border-2 border-neutral-400 bg-white px-8 py-4 text-start shadow-xl">
        <p className="italic ">Este comentario ya no está disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border-2 border-neutral-400 bg-white px-8 pb-4 pt-8 text-start shadow-xl">
      <Tooltip
        id="tooltip"
        render={() => <p>Este lector no ha creado una cuenta en Deletrar.</p>}
      />

      {/* <!-- User Info with Three-Dot Menu --> */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-full w-full items-start gap-2 truncate">
          <img
            data-tooltip-id={isAnonymousComment && "tooltip"}
            onClick={() => {
              if (!isAnonymousComment)
                return navigate(`/user/${comment?.author?.username}`);
            }}
            src={comment?.author?.photo || "/users/anonymous.png"}
            alt={comment?.author?.username || "Lector Anónimo"}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div className="flex w-full flex-col justify-between gap-1 truncate">
            <div className="truncate">
              <p
                data-tooltip-id={isAnonymousComment && "tooltip"}
                onClick={() => {
                  if (isAnonymousComment) return;
                  return navigate(`/user/${comment?.author?.username}`);
                }}
                className=" inline truncate font-semibold text-gray-800"
              >
                {comment?.author?.name || "Lector Anónimo"}
              </p>
            </div>

            <Link to={`/comment/${comment?._id}`}>
              <p className="text-xl text-gray-500">
                Comentado {dateDistance(comment?.postedAt)}
              </p>
            </Link>
          </div>
        </div>
        <div className="cursor-pointer text-gray-500">
          {/* <!-- Three-dot menu icon --> */}
          <button className="rounded-full hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <Link to={`/comment/${comment?._id}`}>
        {/* <!-- Comment Origin --> */}
        {comment?.replyingTo && (
          <div className="truncate break-words text-xl text-gray-500">
            <p className="truncate">
              En respuesta a{" "}
              {comment.replyingTo.author?.name || "Lector Anónimo"}
            </p>
          </div>
        )}
        <p className="mb-2 line-clamp-2 break-words text-xl text-gray-500">
          <span>En el marco</span>
          {comment?.targetPost && (
            <>
              <span> del texto </span>
              <span className="font-medium">{comment.targetPost.title}</span>
            </>
          )}
          {comment?.targetCollection && (
            <>
              <span> de la colección </span>
              <span className="font-medium">
                {comment.targetCollection.title}
              </span>
            </>
          )}
        </p>
        {/* <!-- Content--> */}
        {comment?.content && (
          <TruncatedText text={comment.content} maxLines={4} />
        )}
      </Link>

      {/* <!-- Like and Comment Section --> */}
      {/* <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex items-center justify-center gap-2 rounded-full p-1 px-2 hover:bg-gray-50">
            <svg
              className="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full p-1 px-2 hover:bg-gray-50">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              ></path>
            </g>
          </svg>
          <span>3 Comment</span>
        </button>
      </div> */}
    </div>
  );
}

export default FeedComment;
