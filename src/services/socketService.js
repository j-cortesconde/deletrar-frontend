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

  sendMessage(conversationId) {
    this.#socket.emit("sendMessage", conversationId);
  }

  onNewMessage(callback) {
    this.#socket.on("newMessage", callback);
  }

  onError(callback) {
    this.#socket.on("error", callback);
  }
}

const socketService = new SocketService();
export default socketService;
