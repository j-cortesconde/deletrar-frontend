import axiosService from "./axiosService";

// export async function getPost(postId) {
//   try {
//     if (!postId) return null;

//     const response = await axiosService.getPost(postId);
//     return response.data.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }

export async function getComments(type, id) {
  try {
    const response = await axiosService.getComments(type, id);

    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function createComment(comment) {
  const response = await axiosService.createComment(comment);
  return response.data.data;
}
