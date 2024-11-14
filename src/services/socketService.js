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

  sendMessage(conversationId, addresseeUsername) {
    this.#socket.emit("sendMessage", conversationId, addresseeUsername);
  }

  onNewConversationMessage(callback) {
    this.#socket.on("newConversationMessage", callback);
  }

  offNewConversationMessage(callback) {
    this.#socket.off("newConversationMessage");
  }

  onNewUserMessage(callback) {
    this.#socket.on("newUserMessage", callback);
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
