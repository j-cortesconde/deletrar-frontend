// TODO: Fix so that it never exceeds screen size and instead the space for messages has scrollbar (and so that the div is focused at the bottom of its scroll at start)
// TODO: Conversation messages, even when all got together, should be displayed in parts to aleviate rendering times. Maybe should find a way to first render ConversationMessage for the last X messages in the array (and also find a way to detect when user scrolls to top so that it renders the X number of messages before those too [The way facebook/wa do])
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";
import socketService from "../../services/socketService";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";
import ConversationMessage from "./ConversationMessage";

function ConversationDetail() {
  const [newOwnMessage, setNewOwnMessage] = useState();
  const [combinedMessages, setCombinedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { addresseeUsername } = useParams();

  const {
    user: addressee,
    isLoading: isLoading1,
    error: error1,
  } = useUser(addresseeUsername);
  const {
    conversation,
    messages,
    refetch,
    isLoading: isLoading2,
    error: error2,
  } = useConversation(addresseeUsername);

  const conversationId = conversation?._id;

  // As soon as the conversation data is loaded this primes the socket and sets the messages into the combinedMessages state variable
  useEffect(() => {
    if (conversationId) {
      setCombinedMessages([...messages]);

      socketService.joinConversation(conversationId);
      socketService.onTyping(() => {
        setIsTyping(true);
      });
      socketService.onStopTyping(() => {
        setIsTyping(false);
      });
      socketService.onNewConversationMessage((newMessage) => {
        setCombinedMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      if (conversationId) {
        socketService.leaveConversation(conversationId);
        socketService.offTyping();
        socketService.offStopTyping();
        socketService.offNewConversationMessage();
      }
    };
  }, [conversationId, messages]);

  // Listens to the addition/change of a newOwnMessage and pushes it onto the combinedMessage state (so no need to trigger refetch on message send)
  useEffect(() => {
    if (newOwnMessage)
      setCombinedMessages((prevMessages) => [...prevMessages, newOwnMessage]);
  }, [newOwnMessage]);

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
        <div className="grid grid-rows-[3fr_2fr] items-end text-start">
          <p className="">{addressee.name}</p>
          <p className="text-xl">
            {isTyping ? "Escribiendo..." : addressee.username}
          </p>
        </div>
      </div>
      <div className="mt-4 grow overflow-y-auto">
        {combinedMessages?.map((message, i) => (
          <ConversationMessage
            key={message._id}
            message={message}
            addressee={addressee}
            previousMessageTime={combinedMessages[i - 1]?.timestamp}
          />
        ))}
      </div>
      <ConversationMessageSend
        conversationId={conversationId}
        addresseeUsername={addresseeUsername}
        setNewOwnMessage={setNewOwnMessage}
      />
    </div>
  );
}

export default ConversationDetail;
