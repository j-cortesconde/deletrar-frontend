import { useQueryClient } from "@tanstack/react-query";
import { minimumRelativeDate } from "../../utils/dateFormat";

function ConversationCard({ conversation, handleSelect }) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const addressee = conversation.participants.find(
    (participant) => participant.username !== ownUser.username,
  );

  return (
    <div
      onClick={() => handleSelect(addressee)}
      className="flex w-full select-none items-center justify-start gap-2 rounded-3xl p-2 hover:cursor-pointer hover:bg-slate-300"
    >
      <img
        className="h-20 w-20 rounded-full"
        src={`/users/${addressee.photo}`}
        alt={addressee.name}
      />
      <div className="flex w-full min-w-0 flex-col gap-2">
        <p className="truncate text-left text-2xl">{addressee.name}</p>
        <div className="flex w-full items-baseline justify-between gap-2">
          <p className="truncate text-left text-xl">
            {conversation.lastMessage.content}
          </p>
          <p className="text-lg capitalize">
            {minimumRelativeDate(conversation.lastMessage.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConversationCard;
