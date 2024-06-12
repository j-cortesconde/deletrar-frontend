import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function ConversationCreate() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const addressee = queryClient.getQueryData(["newConversation", username]);
  return (
    <div>
      <p>{addressee.name}</p>
      <p>{addressee.username}</p>
      <p>{addressee.photo}</p>
    </div>
  );
}

export default ConversationCreate;
