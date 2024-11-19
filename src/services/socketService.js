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

        const conversations = [updatedConversation, ...filteredConversations];

        return { totalCount, hasNextPage, nextPage, conversations };
      });
    };

    this.#socket.on("newConversationMessage", callBack);
  }

  offNewConversationMessage(callback) {
    this.#socket.off("newConversationMessage");
  }

  onNewUserMessage(queryClient) {
    console.log("Corre");
    const callBack = (updatedConversation) => {
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

  offNewUserMessage(callback) {
    this.#socket.off("newUserMessage");
  }

  onTyping(callback) {
    this.#socket.on("typing", callback);
  }

  offTyping(callback) {
    this.#socket.off("typing");
  }

  onStopTyping(callback) {
    this.#socket.on("stopTyping", callback);
  }

  offStopTyping(callback) {
    this.#socket.off("stopTyping");
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
