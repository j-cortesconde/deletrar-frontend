import { useNavigate } from "react-router-dom";
import { timeDate } from "../../utils/dateFormat";

function MainCommentData({ comment }) {
  const navigate = useNavigate();

  const isAnonymousComment = !comment.author;

  return (
    <div>
      <div className="flex gap-6">
        <img
          onClick={() => {
            if (isAnonymousComment) return;
            return navigate(`/user/${comment?.author.username}`);
          }}
          className="h-28 w-28 rounded-full hover:cursor-pointer"
          src={comment?.author?.photo || "/users/anonymous.png"}
          alt={comment?.author?.username || "Lector Anónimo"}
        />

        <div className="pt-2">
          <p
            onClick={() => {
              if (isAnonymousComment) return;
              return navigate(`/user/${comment?.author.username}`);
            }}
            className="text-left text-4xl hover:cursor-pointer"
          >
            {comment?.author?.name || "Lector Anónimo"}
          </p>

          {!isAnonymousComment && (
            <p
              onClick={() => {
                if (isAnonymousComment) return;
                return navigate(`/user/${comment?.author.username}`);
              }}
              className="text-left text-2xl hover:cursor-pointer"
            >
              {comment?.author.username}
            </p>
          )}
        </div>
      </div>

      <div className="mx-2 my-4 pl-2">
        <p className="select-text flex-wrap whitespace-pre-wrap break-words text-left text-4xl">
          {comment?.content}
        </p>
      </div>
      <div className="mx-2 my-2 pl-2">
        <p className="text-left text-2xl first-letter:capitalize">
          {timeDate(comment?.postedAt)}
        </p>
      </div>
    </div>
  );
}

export default MainCommentData;
