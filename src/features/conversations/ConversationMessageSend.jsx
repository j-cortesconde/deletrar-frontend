import { useState } from "react";
import { MdSend } from "react-icons/md";

import { useSendMesssage } from "./useSendMessage";
import socketService from "../../services/socketService";

function ConversationMessageSend({ conversationId, addresseeUsername }) {
  const [messageContent, setMessageContent] = useState("");
  const { sendMessage, isSending } = useSendMesssage();

  function onSend(e) {
    e.preventDefault();
    if (!messageContent) return;

    sendMessage(
      { addressee: addresseeUsername, message: messageContent },
      {
        onSuccess: () => {
          socketService.sendMessage(conversationId, addresseeUsername);
          setMessageContent("");
        },
      },
    );
  }

  return (
    <form className="flex items-center justify-center gap-2">
      <input
        placeholder="Aa"
        autoFocus
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <button onClick={onSend}>
        <MdSend className="h-8 w-8" />
      </button>
    </form>
  );
}

export default ConversationMessageSend;
