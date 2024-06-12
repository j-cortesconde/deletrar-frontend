import axiosService from "./axiosService";

export async function getConversation(username) {
  try {
    const response = await axiosService.getConversation(username);
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getConversations(username, queryString) {
  try {
    const response = await axiosService.getConversations(username, queryString);

    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
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
