import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001";

class SocketService {
  #jwt;
  #socket;

  connect() {
    this.#jwt = localStorage.getItem("jwt");

    this.#socket = io(SOCKET_SERVER_URL, { auth: { token: this.#jwt } });
  }

  disconnect() {
    this.#socket.disconnect();
  }

  joinConversation(conversationId) {
    this.#socket.emit("joinConversation", conversationId);
  }

  leaveConversation(conversationId) {
    this.#socket.emit("leaveConversation", conversationId);
  }

  sendMessage(conversation, addresseeUsername, newMessage) {
    this.#socket.emit(
      "sendMessage",
      conversation,
      addresseeUsername,
      newMessage,
    );
  }

  markAsRead(conversationId, messageId) {
    this.#socket.emit("messageRead", conversationId, messageId);
  }

  onNewConversationMessage(queryClient, addresseeUsername) {
    const callBack = (updatedConversation, newMessage) => {
      queryClient.setQueryData(
        ["conversation", addresseeUsername],
        (oldData) => {
          const { pages: oldPages, pageParams: oldPageParams } = oldData;

          const newPages = [
            {
              ...oldPages[0],
              conversation: updatedConversation,
              messages: [...(oldPages?.[0]?.messages || []), newMessage],
            },
            ...oldPages.slice(1),
          ];

          newPages[0].conversation.lastMessage = newMessage;

          return { pages: newPages, pageParams: oldPageParams };
        },
      );

      queryClient.setQueryData(["conversations"], (oldData) => {
        const { pages, pageParams } = oldData;

        // Access al 'conversations' arrays and filter them. Modify the arrays and each page containing them.
        const updatedPages = pages.map((page) => {
          const filteredConversations = page.conversations?.filter(
            (conv) => conv._id !== updatedConversation._id,
          );
          return { ...page, conversations: filteredConversations };
        });

        // Insert the updated conversation into the 'conversations' array of the first page
        updatedPages[0].conversations = [
          updatedConversation,
          ...(updatedPages[0]?.conversations || []),
        ];

        // Mark the last message of the updated conversation as read (since this is onNewConversationMessage)
        updatedPages[0].conversations[0].lastMessage.read = true;

        return { pages: updatedPages, pageParams };
      });

      this.markAsRead(updatedConversation._id, newMessage._id);
    };

    this.#socket.on("newConversationMessage", callBack);
  }

  offNewConversationMessage() {
    this.#socket.off("newConversationMessage");
  }

  onNewUserMessage(queryClient, selectedConversationUsername) {
    const callBack = (updatedConversation) => {
      const updatedConversationIsSelected =
        updatedConversation.participants.some(
          (participant) =>
            participant.username === selectedConversationUsername,
        );

      // Guard clause so the updating of the conversations list will be handled by onNewConversationMessage when the message that is being sent corresponds to a conversation that is selected
      if (updatedConversationIsSelected) return;

      queryClient.setQueryData(["conversations"], (oldData) => {
        const { pages, pageParams } = oldData;

        // Access al 'conversations' arrays and filter them. Modify the arrays and each page containing them.
        const updatedPages = pages.map((page) => {
          const filteredConversations = page.conversations?.filter(
            (conv) => conv._id !== updatedConversation._id,
          );
          return { ...page, conversations: filteredConversations };
        });

        // Insert the updated conversation into the 'conversations' array of the first page
        updatedPages[0].conversations = [
          updatedConversation,
          ...(updatedPages[0]?.conversations || []),
        ];

        return { pages: updatedPages, pageParams };
      });
    };

    this.#socket.on("newUserMessage", callBack);
  }

  offNewUserMessage() {
    this.#socket.off("newUserMessage");
  }

  onTyping(callback) {
    this.#socket.on("typing", callback);
  }

  offTyping() {
    this.#socket.off("typing");
  }

  onStopTyping(callback) {
    this.#socket.on("stopTyping", callback);
  }

  offStopTyping() {
    this.#socket.off("stopTyping");
  }

  onRead(queryClient) {
    const callBack = (conversationId, messageId) => {
      queryClient.setQueryData(["conversations"], (oldData) => {
        const { pages, pageParams } = oldData;

        // Access al 'conversations' arrays and mark the read conversation as read. Modify  each page containing the conversations array.
        const updatedPages = pages.map((page) => {
          const modifiedConversations = page.conversations?.map(
            (conversation) => {
              if (conversation._id === conversationId) {
                return {
                  ...conversation,
                  lastMessage: {
                    ...conversation.lastMessage,
                    read:
                      conversation.lastMessage._id === messageId
                        ? true
                        : conversation.lastMessage.read,
                  },
                };
              }
              return conversation;
            },
          );
          return { ...page, conversations: modifiedConversations };
        });

        return { pages: updatedPages, pageParams };
      });
    };

    this.#socket.on("isRead", callBack);
  }

  offRead() {
    this.#socket.off("isRead");
  }

  emitTyping(conversationId) {
    this.#socket.emit("typing", conversationId);
  }

  emitStopTyping(conversationId) {
    this.#socket.emit("stopTyping", conversationId);
  }

  // TODO: Add or check
  // onError(callback) {
  //   this.#socket.on("error", callback);
  // }
}

const socketService = new SocketService();
export default socketService;
