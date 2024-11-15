// TODO: Fix so that it never exceeds screen size and instead the space for conversations  has scrollbar
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../hooks/useDebounce";
import { useConversations } from "./useConversations";

import ConversationSearch from "../search/conversation/ConversationSearch";
import ConversationCard from "./ConversationCard";
import socketService from "../../services/socketService";

function ConversationSelection() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { conversations, isLoading, refetch } = useConversations();

  useEffect(() => {
    if (!isLoading)
      socketService.onNewUserMessage(() => {
        refetch();
      });

    return () => {
      socketService.offNewUserMessage();
    };
  }, [refetch, isLoading]);

  function handleSelect(addressee) {
    navigate(`/conversations/user/${addressee.username}`);
  }

  return (
    <div className="flex w-full flex-col justify-start gap-2">
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
          <ConversationCard
            key={conversation._id}
            conversation={conversation}
            handleSelect={handleSelect}
          />
        ))}
    </div>
  );
}

export default ConversationSelection;
