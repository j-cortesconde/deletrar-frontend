import axiosService from "./axiosService";

// export async function getComment(commentId) {
//   try {
//     if (!commentId) return null;

//     const response = await axiosService.getComment(commentId);
//     return response.data.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }

export async function getShareds({ sharerUsername, pageParam = 1 }) {
  const response = await axiosService.getShareds(sharerUsername, pageParam);

  return response.data.data;
}

export async function createShared(newShared) {
  const response = await axiosService.createShared(newShared);
  return response.data.data;
}

// export async function updateComment(commentId, comment) {
//   const response = await axiosService.updateComment(commentId, comment);
//   return response.data.data;
// }

// export async function getCommentThread(commentId) {
//   try {
//     if (!commentId) return null;

//     const response = await axiosService.getCommentThread(commentId);
//     return response.data.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }
