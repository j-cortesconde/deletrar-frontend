import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";

function ConversationDetail() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useOutletContext();
  const { username } = useParams();

  const { user, isLoading: isLoading1, error: error1 } = useUser(username);
  const {
    conversation,
    isLoading: isLoading2,
    error: error2,
  } = useConversation(username);

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
          src={`/users/${user.photo}`}
          alt={`${user.username}`}
        />
        <p>{user.name}</p>
      </div>
      <div className="grow">
        {conversation.messages?.map((message) => (
          <p key={message._id}>{message.content}</p>
        ))}
      </div>
      <ConversationMessageSend />
    </div>
  );
}

export default ConversationDetail;
