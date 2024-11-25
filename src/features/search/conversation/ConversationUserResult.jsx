import ScrollableLi from "../../../ui/ScrollableLi";

function ConversationUserResult({ selected = false, user, onClick }) {
  return (
    <ScrollableLi selected={selected} onClick={onClick}>
      <div className="flex items-center justify-start gap-2">
        <img
          src={user.photo}
          alt={`${user.name}`}
          className="h-10 w-10 rounded-full"
        />
        <p className="truncate">{user.name}</p>
      </div>
    </ScrollableLi>
  );
}

export default ConversationUserResult;
