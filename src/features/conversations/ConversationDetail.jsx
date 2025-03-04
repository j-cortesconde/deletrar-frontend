// TODO: Fix so that it never exceeds screen size and instead the space for messages has scrollbar (and so that the div is focused at the bottom of its scroll at start)
// TODO: Conversation messages, even when all got together, should be displayed in parts to aleviate rendering times. Maybe should find a way to first render ConversationMessage for the last X messages in the array (and also find a way to detect when user scrolls to top so that it renders the X number of messages before those too [The way facebook/wa do])
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "../users/useUser";
import { useConversation } from "./useConversation";
import socketService from "../../services/socketService";

import Loader from "../../ui/Loader";
import ConversationMessageSend from "./ConversationMessageSend";
import ConversationMessages from "./ConversationMessages";
import { Tooltip } from "react-tooltip";

function ConversationDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addresseeUsername } = useParams();
  const [isTyping, setIsTyping] = useState(false);

  const { username: self } = queryClient.getQueryData(["user"]);

  const {
    user: addressee,
    isLoading: isLoading1,
    error,
  } = useUser(addresseeUsername);

  const isAddresseeInactive = !addressee;

  const {
    conversation,
    pages,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading2,
  } = useConversation(addresseeUsername);

  const conversationId = conversation?._id;

  // As soon as the conversation data is loaded this primes the socket and sets the messages into the combinedMessages state variable
  useEffect(() => {
    if (conversationId) {
      socketService.joinConversation(conversationId);
      socketService.onTyping(() => {
        setIsTyping(true);
      });
      socketService.onStopTyping(() => {
        setIsTyping(false);
      });
      socketService.onNewConversationMessage(queryClient, addresseeUsername);
    }

    return () => {
      if (conversationId) {
        socketService.leaveConversation(conversationId);
        socketService.offTyping();
        socketService.offStopTyping();
        socketService.offNewConversationMessage();
      }
    };
  }, [conversationId, addresseeUsername, queryClient]);

  useEffect(() => {
    if (conversation?.lastMessage?.messenger === addresseeUsername) {
      socketService.markAsRead(conversation._id, conversation.lastMessage._id);
    }
  }, [addresseeUsername, conversation]);

  //TODO: Should be localized spinner
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    // {/* <!-- Main Chat Area --> */}
    // <div className="flex-1">
    <div className="flex h-full flex-col">
      <Tooltip
        id="tooltip"
        render={() => <p>Este lector no existe o ha borrado su cuenta.</p>}
      />

      {/* <!-- Chat Header --> */}
      <header className="mx-10 flex items-center justify-start gap-2 border-b-2 border-slate-400 border-opacity-50 pb-2 pt-5">
        <img
          data-tooltip-id={isAddresseeInactive && "tooltip"}
          className={`h-20 w-20 rounded-full object-cover ${isAddresseeInactive ? "" : "cursor-pointer"}`}
          src={addressee?.photo || "/users/anonymous.png"}
          alt={addressee?.name || "Lector Anónimo"}
          onClick={() => {
            if (isAddresseeInactive) return;
            return navigate(`/user/${addressee?.username}`);
          }}
        />
        <div className="grid grid-rows-[3fr_2fr] items-end text-start">
          <p
            data-tooltip-id={isAddresseeInactive && "tooltip"}
            className={`${isAddresseeInactive ? "" : "cursor-pointer"} select-none`}
            onClick={() => {
              if (isAddresseeInactive) return;
              return navigate(`/user/${addressee?.username}`);
            }}
          >
            {addressee?.name || "Lector Anónimo"}
          </p>
          <p className="select-none text-xl">
            {isTyping ? "Escribiendo..." : addressee?.username}
          </p>
        </div>
      </header>

      {/* <!-- Chat Messages List --> */}
      <ConversationMessages
        pages={pages}
        addressee={addressee}
        self={self}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <ConversationMessageSend
        conversationId={conversationId}
        addresseeUsername={addresseeUsername}
      />
    </div>
  );
}

export default ConversationDetail;
