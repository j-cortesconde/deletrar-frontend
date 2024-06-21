// TODO: Style and make it work
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";
import socketService from "../../services/socketService";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";
import ConversationMessage from "./ConversationMessage";

function ConversationDetail() {
  const { addresseeUsername } = useParams();

  const {
    user: addressee,
    isLoading: isLoading1,
    error: error1,
  } = useUser(addresseeUsername);
  const {
    conversation,
    refetch,
    isLoading: isLoading2,
    error: error2,
  } = useConversation(addresseeUsername);

  const conversationId = conversation?._id;

  useEffect(() => {
    if (conversationId) {
      socketService.joinConversation(conversationId);
    }

    return () => {
      if (conversationId) {
        socketService.leaveConversation(conversationId);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) socketService.onNewConversationMessage(refetch);

    return () => {
      socketService.offNewConversationMessage();
    };
  }, [refetch, conversationId]);

  //TODO: Should be localized spinner
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="flex h-full flex-col">
      <div className="mx-10 flex items-center justify-start gap-2 border-b-2 border-slate-400 border-opacity-50 pb-2">
        <img
          className="h-20 w-20 rounded-full"
          src={`/users/${addressee.photo}`}
          alt={`${addressee.username}`}
        />
        <p>{addressee.name}</p>
      </div>
      <div className="mt-4 grow">
        {conversation?.messages?.map((message, i) => (
          <ConversationMessage
            key={message._id}
            message={message}
            addressee={addressee}
            previousMessageTime={conversation.messages[i - 1]?.timestamp}
          />
        ))}
      </div>
      <ConversationMessageSend
        conversationId={conversationId}
        addresseeUsername={addresseeUsername}
      />
    </div>
  );
}

export default ConversationDetail;
