import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

class SocketService {
  #jwt = localStorage.getItem("jwt");
  #socket;

  connect() {
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

  onNewConversationMessage(queryClient, addresseeUsername) {
    const callBack = (updatedConversation, newMessage) => {
      queryClient.setQueryData(
        ["conversation", addresseeUsername],
        (oldData) => {
          const { conversation } = oldData;
          const messages = [...(oldData?.messages || []), newMessage];

          return { conversation, messages };
        },
      );

      queryClient.setQueryData(["conversations"], (oldData) => {
        const { totalCount, hasNextPage, nextPage } = oldData;

        const filteredConversations = oldData?.conversations?.filter(
          (conversation) => conversation._id !== updatedConversation._id,
        );

        updatedConversation.lastMessage.read = true;

        const conversations = [updatedConversation, ...filteredConversations];

        conversations[0].lastMessage.read = true;

        return { totalCount, hasNextPage, nextPage, conversations };
      });

      this.#socket.emit("messageRead", updatedConversation._id, newMessage._id);
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
        const { totalCount, hasNextPage, nextPage } = oldData;

        const filteredConversations = oldData?.conversations?.filter(
          (conversation) => conversation._id !== updatedConversation._id,
        );

        const conversations = [updatedConversation, ...filteredConversations];

        return { totalCount, hasNextPage, nextPage, conversations };
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
        const { totalCount, hasNextPage, nextPage } = oldData;

        const conversations = oldData.conversations.map((conversation) => {
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
        });

        return { totalCount, hasNextPage, nextPage, conversations };
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
