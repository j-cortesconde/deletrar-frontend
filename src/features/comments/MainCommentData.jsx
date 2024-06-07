import { useNavigate } from "react-router-dom";
import { timeDate } from "../../utils/dateFormat";

function MainCommentData({ comment }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-6">
        <img
          onClick={() => navigate(`/user/${comment?.author.username}`)}
          className="h-28 w-28 rounded-full hover:cursor-pointer"
          src={`/users/${comment?.author.photo}`}
          alt={comment?.author.username}
        />

        <div className="pt-2">
          <p
            onClick={() => navigate(`/user/${comment?.author.username}`)}
            className="text-left text-4xl hover:cursor-pointer"
          >
            {comment?.author.name}
          </p>

          <p
            onClick={() => navigate(`/user/${comment?.author.username}`)}
            className="text-left text-2xl hover:cursor-pointer"
          >
            {comment?.author.username}
          </p>
        </div>
      </div>

      <div className="mx-2 my-4 pl-2">
        <p className="select-text break-words text-left text-4xl">
          {comment?.content}
        </p>
      </div>
      <div className="mx-2 my-2 pl-2">
        <p className="text-left text-2xl first-letter:capitalize">
          {timeDate(comment?.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default MainCommentData;
