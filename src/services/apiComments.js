import axiosService from "./axiosService";

export async function getComment(commentId) {
  if (!commentId) return null;

  const response = await axiosService.getComment(commentId);
  return response.data.data;
}

export async function getComments(type, id, page) {
  const response = await axiosService.getComments(type, id, page);

  return response.data.data;
}

export async function createComment(comment) {
  const response = await axiosService.createComment(comment);
  return response.data.data;
}

export async function updateComment(commentId, comment) {
  const response = await axiosService.updateComment(commentId, comment);
  return response.data.data;
}

export async function getCommentThread(commentId) {
  if (!commentId) return null;

  const response = await axiosService.getCommentThread(commentId);
  return response.data.data;
}
