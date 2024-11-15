import { useQueryClient } from "@tanstack/react-query";
import { minimumRelativeDate } from "../../utils/dateFormat";
import { IoCheckmarkDoneOutline, IoCheckmarkDoneSharp } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { useState } from "react";

function ConversationCard({ conversation, handleSelect }) {
  const [isRead, setIsRead] = useState(conversation.lastMessage.read);
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const addressee = conversation.participants.find(
    (participant) => participant.username !== ownUser.username,
  );

  function handleClick() {
    setIsRead(true);
    handleSelect(addressee);
  }

  return (
    <div
      onClick={handleClick}
      className="flex w-full select-none items-center justify-start gap-2 rounded-3xl p-2 hover:cursor-pointer hover:bg-slate-300"
    >
      <img
        className="h-20 w-20 rounded-full"
        src={`/users/${addressee.photo}`}
        alt={addressee.name}
      />
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex w-full items-baseline justify-between gap-2">
          <p className="truncate text-left text-2xl">{addressee.name}</p>
          <p className="text-xl capitalize">
            {minimumRelativeDate(conversation.lastMessage.timestamp)}
          </p>
        </div>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex w-full items-center gap-1 truncate">
            {conversation.lastMessage.messenger === ownUser.username &&
              (conversation.lastMessage.read ? (
                <IoCheckmarkDoneSharp className="w-8 text-black" />
              ) : (
                <IoCheckmarkDoneOutline className="w-8" />
              ))}
            <p className="truncate text-left text-2xl">
              {conversation.lastMessage.content}
            </p>
          </div>
          <div>
            {conversation.lastMessage.messenger !== ownUser.username &&
              !isRead && <SiGooglemessages className="h-8 w-8" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationCard;
