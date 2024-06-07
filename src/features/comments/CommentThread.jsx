// TODO: Seguir desde acá. Quizás que el isMainComment cambie el formateo. Quizás que haya un tipo de CommentCard en el que cliquear en respuestas solo produce un nuevo detail (ver cuando a veces el detail falla)
import CommentCard from "./CommentCard";

function CommentThread({ commentThread, mainComment }) {
  const reversedCommentThread = commentThread.slice().reverse();

  const completeThread = [...reversedCommentThread, mainComment];

  return (
    <ul>
      {completeThread?.map((comment, i) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          isMainComment={i === commentThread.length}
        />
      ))}
    </ul>
  );
}

export default CommentThread;
