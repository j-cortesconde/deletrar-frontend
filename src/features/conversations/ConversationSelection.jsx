// TODO: Fix so that it never exceeds screen size and instead the space for conversations  has scrollbar
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useDebounce } from "../../hooks/useDebounce";
import { useConversations } from "./useConversations";

import ConversationSearch from "../search/conversation/ConversationSearch";
import ConversationCard from "./ConversationCard";
import socketService from "../../services/socketService";
import Loader from "../../ui/Loader";

function ConversationSelection() {
  const { addresseeUsername } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { ref: inViewRef, inView } = useInView();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useConversations();

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  function handleSelect(addressee) {
    queryClient.refetchQueries({
      queryKey: ["conversation", addressee.username],
      exact: true,
    });
    navigate(`/conversations/user/${addressee.username}`);
  }

  return (
    <div className="flex w-1/4 flex-col justify-start gap-2 bg-slate-200 p-5">
      <header className="">
        <h1 className="text-left text-2xl font-semibold">Conversaciones</h1>
        <ConversationSearch
          query={query}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          handleSelect={handleSelect}
        />
      </header>

      {/* <!-- Contact List --> */}
      <div className="h-full overflow-y-auto p-3">
        {debouncedQuery === "" &&
          data?.pages?.[0]?.conversations?.length === 0 && (
            <p className="text-left">No hay conversaciones aún</p>
          )}

        {debouncedQuery === "" &&
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.conversations?.map((conversation) => (
                <ConversationCard
                  key={conversation._id}
                  conversation={conversation}
                  handleSelect={handleSelect}
                />
              ))}
            </React.Fragment>
          ))}
        <div ref={inViewRef} className="h-5">
          {/* //TODO: Should be localized spinner */}
          {isFetchingNextPage && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default ConversationSelection;
