import { useNavigate } from "react-router-dom";
import { longDate } from "../../utils/dateFormat";

function CommentData({ comment }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4">
        <img
          onClick={() => navigate(`/user/${comment.author.username}`)}
          className="h-20 w-20 rounded-full hover:cursor-pointer"
          src={`/users/${comment.author.photo}`}
          alt={comment.author.username}
        />

        <div>
          <p
            onClick={() => navigate(`/user/${comment.author.username}`)}
            className="text-left hover:cursor-pointer"
          >
            {comment.author.name}
            <span className="text-xl"> - {comment.author.username}</span>
          </p>
          {/* //TODO:CHANGE FORMAT */}
          {/* // TODO: Add redirect to comment specific view */}
          <p className="text-left text-xl">{longDate(comment.createdAt)}</p>
        </div>
      </div>

      <div className="mx-2 mb-2 pl-20">
        <p className="select-text break-words text-left">{comment.content}</p>
      </div>
    </>
  );
}

export default CommentData;
