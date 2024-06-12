import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useDebounce } from "../../hooks/useDebounce";
import { useConversations } from "./useConversations";

import ConversationSearch from "../search/conversation/ConversationSearch";

function ConversationSelection() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { conversations, count, isLoading } = useConversations();

  function handleSelect(user) {
    navigate(`/conversations/user/${user.username}`);
  }

  return (
    <div className="flex flex-col justify-start gap-2">
      <ConversationSearch
        query={query}
        setQuery={setQuery}
        debouncedQuery={debouncedQuery}
        handleSelect={handleSelect}
      />

      {debouncedQuery === "" && conversations?.length === 0 && (
        <p className="text-left">No hay conversaciones aún</p>
      )}

      {debouncedQuery === "" &&
        conversations?.map((conversation) => (
          <p key={conversation._id} className="text-left">
            {conversation.messages[0]}
          </p>
        ))}
    </div>
  );
}

export default ConversationSelection;
