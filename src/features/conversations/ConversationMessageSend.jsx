import { useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

import { useSendMesssage } from "./useSendMessage";
import socketService from "../../services/socketService";

function ConversationMessageSend({ conversationId, addresseeUsername }) {
  const [messageContent, setMessageContent] = useState("");
  const [typing, setTyping] = useState(false);
  const typingTimeout = useRef(null);
  const { sendMessage, isSending } = useSendMesssage();

  const handleType = (e) => {
    setMessageContent(e.target.value);

    if (!typing) {
      setTyping(true);
      socketService.emitTyping(conversationId);
    }

    // Clear any existing timeout before setting a new one
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // Set a new timeout to stop typing after 3 seconds of inactivity
    typingTimeout.current = setTimeout(() => {
      socketService.emitStopTyping(conversationId);
      setTyping(false);
    }, 3000);
  };

  function handleSend(e) {
    e.preventDefault();
    if (!messageContent) return;

    sendMessage(
      { addressee: addresseeUsername, message: messageContent },
      {
        onSuccess: ({ newMessage, conversation }) => {
          socketService.sendMessage(
            conversation,
            addresseeUsername,
            newMessage,
          );
          socketService.emitStopTyping(conversationId);
          setTyping(false);
          setMessageContent("");
        },
      },
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  }

  return (
    <div className="w-full  bg-slate-400 p-4">
      <form className="flex w-full items-center justify-center gap-2 p-4">
        <TextareaAutosize
          placeholder="Aa"
          // TODO: Scrollbar styling
          className="w-full resize-none rounded-2xl px-3 py-1"
          maxRows={8}
          autoFocus
          value={messageContent}
          onKeyDown={handleKeyDown}
          onChange={handleType}
        />
        <button onClick={handleSend}>
          <MdSend className="h-8 w-8" />
        </button>
      </form>
    </div>
  );
}

export default ConversationMessageSend;
