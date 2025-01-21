import { BiLoaderAlt } from "react-icons/bi";
import { useScrollList } from "../../../hooks/useScrollList";

import ConversationUserResult from "./ConversationUserResult";

function ConversationUserResults({
  isFetching,
  users,
  handleSelect,
  onCloseResults,
}) {
  const { listRef, selectedIndex } = useScrollList(onCloseResults);

  // While fetching
  if (isFetching)
    return (
      <div className="flex items-center justify-start gap-2">
        <p className="text-justify">Estamos buscando</p>
        <BiLoaderAlt className="animate-spin" />
      </div>
    );
  // When nothing found
  if (users?.length === 0)
    return (
      <div>
        <p className="text-justify">Tu búsqueda no devolvió resultados.</p>
      </div>
    );

  return (
    // When something's found
    <ul ref={listRef} className="flex flex-col gap-2">
      <p className="border-b-2 border-slate-400 text-justify font-semibold">
        Usuarios
      </p>
      {users?.map((user, index) => (
        <ConversationUserResult
          key={user._id}
          onClick={() => handleSelect(user)}
          user={user}
          selected={index === selectedIndex}
        />
      ))}
    </ul>
  );
}

export default ConversationUserResults;
