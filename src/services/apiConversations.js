import axiosService from "./axiosService";

export async function getConversation(username, pageParam = 1) {
  const response = await axiosService.getConversation(username, pageParam);
  return response.data.data;
}

export async function getConversations({ pageParam = 1 }) {
  const response = await axiosService.getConversations(pageParam);

  return response.data.data;
}

export async function sendMessage(addressee, message) {
  const response = await axiosService.sendMessage(addressee, message);
  return response.data.data;
}

// export async function createConversation(comment) {
//   const response = await axiosService.createConversation(comment);
//   return response.data.data;
// }

// export async function updateConversation(commentId, comment) {
//   const response = await axiosService.updateConversation(commentId, comment);
//   return response.data.data;
// }
