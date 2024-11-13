// TODO: Fix so that it never exceeds screen size and instead the space for messages has scrollbar (and so that the div is focused at the bottom of its scroll at start)
// TODO: Conversation messages, even when all got together, should be displayed in parts to aleviate rendering times. Maybe should find a way to first render ConversationMessage for the last X messages in the array (and also find a way to detect when user scrolls to top so that it renders the X number of messages before those too [The way facebook/wa do])
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";
import socketService from "../../services/socketService";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";
import ConversationMessage from "./ConversationMessage";

function ConversationDetail() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useOutletContext();
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
  } = useConversation(username);

  const conversationId = conversation?._id;

  console.log("Conve", conversation);
  console.log("Messa", messages);

  useEffect(() => {
    if (socket && conversation && !isLoading2) {
      setMessages([...conversation.messages]);

      socket.emit("join-conversation", conversation._id);
      socket.on("typing", () => {
        setIsTyping(true);
      });
      socket.on("stop-typing", () => {
        setIsTyping(false);
      });

      socket.on("message-recieved", (newMessage) => {
        setMessages([...messages, newMessage]);
      });

      return () => {
        socket.emit("leave-conversation", conversation._id);
      };
    }

    //TODO: No agregar aún todas las dependencias, ver qué pasa cuando se agregan
  }, [isLoading2, conversation]);

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
      <div className="mt-4 grow overflow-y-auto">
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
