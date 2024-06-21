import { useState } from "react";
import { MdSend } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

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
    <div className="w-full rounded-2xl bg-slate-400">
      <form className="flex w-full items-center justify-center gap-2 p-4">
        <TextareaAutosize
          placeholder="Aa"
          // TODO: Scrollbar styling
          className="w-full resize-none rounded-2xl px-3 py-1"
          maxRows={8}
          autoFocus
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={onSend}>
          <MdSend className="h-8 w-8" />
        </button>
      </form>
    </div>
  );
}

export default ConversationMessageSend;
