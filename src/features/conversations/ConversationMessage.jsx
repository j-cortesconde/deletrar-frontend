import { shortDate, time } from "../../utils/dateFormat";

function ConversationMessage({
  message,
  addressee,
  previousMessageTime,
  previousMessageMessenger,
}) {
  const isMessengerAddressee = message.messenger === addressee?.username;
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
        className={`flex w-full ${isMessengerAddressee ? "justify-start" : "justify-end"}`}
      >
        {isMessengerAddressee && (
          <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full">
            {previousMessageMessenger !== message.messenger && (
              <img
                src={addressee?.photo}
                alt="Friend's Initial"
                className="h-10 w-10 rounded-full"
              />
            )}
          </div>
        )}
        <div
          className={`max-w-[80%] rounded-xl ${isMessengerAddressee ? "bg-slate-200" : "bg-slate-500"}`}
        >
          <div
            className={`flex items-end gap-4 p-3 ${isMessengerAddressee ? "" : "text-slate-50"}`}
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
