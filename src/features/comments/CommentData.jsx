import { useNavigate } from "react-router-dom";
import { dateDistance } from "../../utils/dateFormat";
import { Tooltip } from "react-tooltip";

function CommentData({ comment }) {
  const navigate = useNavigate();

  const isAnonymousComment = !comment.author;

  return (
    <div>
      <Tooltip
        id="tooltip"
        render={() => <p>Este lector no ha creado una cuenta en Deletrar.</p>}
      />

      <div className="flex gap-4">
        <img
          data-tooltip-id={isAnonymousComment && "tooltip"}
          onClick={() => {
            if (isAnonymousComment) return;
            return navigate(`/user/${comment?.author?.username}`);
          }}
          className="h-20 w-20 rounded-full object-cover hover:cursor-pointer"
          src={comment?.author?.photo || "/users/anonymous.png"}
          alt={comment?.author?.username || "Lector Anónimo"}
        />

        <div>
          <p
            data-tooltip-id={isAnonymousComment && "tooltip"}
            onClick={() => {
              if (isAnonymousComment) return;
              return navigate(`/user/${comment?.author?.username}`);
            }}
            className="text-justify hover:cursor-pointer"
          >
            {comment?.author?.name || "Lector Anónimo"}
            {!isAnonymousComment && (
              <span className="text-xl"> - {comment?.author?.username}</span>
            )}
          </p>

          <p
            onClick={() => navigate(`/comment/${comment?._id}`)}
            className="text-justify text-xl first-letter:capitalize hover:cursor-pointer"
          >
            {dateDistance(comment?.postedAt)}
          </p>
        </div>
      </div>

      <div className="mx-2 mb-2 pl-20">
        <p className="max-w-[490px] select-text flex-wrap whitespace-pre-wrap break-words text-justify">
          {comment?.content}
        </p>
      </div>
    </div>
  );
}

export default CommentData;
