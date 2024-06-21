import { shortDate, time } from "../../utils/dateFormat";

function ConversationMessage({ message, addressee, previousMessageTime }) {
  const isMessengerAddressee = message.messenger === addressee.username;
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
        <div
          className={`max-w-[80%] rounded-xl ${isMessengerAddressee ? "bg-slate-200" : "bg-slate-500"}`}
        >
          <div
            className={`flex items-end gap-4 p-3 ${isMessengerAddressee ? "" : "text-slate-50"}`}
          >
            <p className="overflow-auto break-words text-left">
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
