import { shortDate, time } from "../../utils/dateFormat";

function ConversationMessage({
  message,
  addressee,
  self,
  previousMessageTime,
  previousMessageMessenger,
}) {
  const isMessengerSelf = message.messenger === self;

  const isNewDay = !(
    shortDate(message.timestamp) === shortDate(previousMessageTime)
  );

  return (
    <div className="mx-20 my-1">
      {isNewDay && (
        <div className="my-1 select-none">
          <p>{shortDate(message.timestamp)}</p>
        </div>
      )}
      <div
        className={`flex w-full ${isMessengerSelf ? "justify-end" : "justify-start"}`}
      >
        {!isMessengerSelf && (
          <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full">
            {previousMessageMessenger !== message.messenger && (
              <img
                src={addressee?.photo || "/users/anonymous.png"}
                alt={addressee?.name || "Lector Anónimo"}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
          </div>
        )}
        <div
          className={`max-w-[80%] rounded-xl ${isMessengerSelf ? "bg-slate-500" : "bg-slate-200"}`}
        >
          <div
            className={`flex items-end gap-4 p-3 ${isMessengerSelf ? "text-slate-50" : ""}`}
          >
            <p className="flex-wrap overflow-auto whitespace-pre-wrap break-words text-justify">
              {message.content}
            </p>
            <p className="text-lg">{time(message.timestamp)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationMessage;
