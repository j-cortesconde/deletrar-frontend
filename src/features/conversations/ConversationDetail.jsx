import { useParams } from "react-router-dom";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";

function ConversationDetail() {
  const { username } = useParams();

  const { user, isLoading: isLoading1, error: error1 } = useUser(username);
  const {
    conversation,
    isLoading: isLoading2,
    error: error2,
  } = useConversation(username);

  //TODO: Should be localized spinner
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="flex h-full flex-col">
      <div className="mx-10 flex items-center justify-start gap-2 border-b-2 border-slate-400 border-opacity-50 pb-2">
        <img
          className="h-20 w-20 rounded-full"
          src={`/users/${user.photo}`}
          alt={`${user.username}`}
        />
        <p>{user.name}</p>
      </div>
      <div className="grow">
        {conversation?.messages?.map((message) => (
          <p key={message._id}>{message.content}</p>
        ))}
      </div>
      <ConversationMessageSend />
    </div>
  );
}

export default ConversationDetail;
