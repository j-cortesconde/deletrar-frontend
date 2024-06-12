import { useSearchUsers } from "../useSearchUsers";
import { useClickOutside } from "../../../hooks/useClickOutside";

import ConversationUserResults from "./ConversationUserResults";

function ConversationSearch({ query, setQuery, debouncedQuery, handleSelect }) {
  const { isFetching, users, error } = useSearchUsers(debouncedQuery);

  function handleCloseResults() {
    setQuery("");
  }

  const { elementRef } = useClickOutside(handleCloseResults);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col justify-start gap-2">
      <input
        ref={elementRef}
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-full rounded-full bg-white px-4 py-2 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50"
      />

      {debouncedQuery !== "" && (
        <ConversationUserResults
          handleSelect={handleSelect}
          isFetching={isFetching}
          users={users}
          onCloseResults={handleCloseResults}
        />
      )}
    </div>
  );
}

export default ConversationSearch;
