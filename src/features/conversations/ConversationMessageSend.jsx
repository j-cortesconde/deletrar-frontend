import { useState } from "react";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";

import { useSendMesssage } from "./useSendMessage";

function ConversationMessageSend() {
  const { username } = useParams();

  const [messageContent, setMessageContent] = useState("");
  const { sendMessage, isSending } = useSendMesssage();

  function onSend(e) {
    e.preventDefault();
    if (!messageContent) return;

    sendMessage({ addressee: username, message: messageContent });
  }

  return (
    <form className="flex items-center justify-center gap-2">
      <input
        placeholder="Aa"
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
