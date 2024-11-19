// TODO: Fix so that it never exceeds screen size and instead the space for conversations  has scrollbar
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDebounce } from "../../hooks/useDebounce";
import { useConversations } from "./useConversations";

import ConversationSearch from "../search/conversation/ConversationSearch";
import ConversationCard from "./ConversationCard";
import socketService from "../../services/socketService";
import { useQueryClient } from "@tanstack/react-query";

function ConversationSelection() {
  const { addresseeUsername } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { conversations, isLoading } = useConversations();

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      socketService.onNewUserMessage(queryClient, addresseeUsername);
      socketService.onRead(queryClient);

      return () => {
        socketService.offNewUserMessage();
        socketService.offRead();
      };
    }
  }, [queryClient, isLoading, addresseeUsername]);

  function handleSelect(addressee) {
    queryClient.refetchQueries({
      queryKey: ["conversation", addressee.username],
      exact: true,
    });
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
