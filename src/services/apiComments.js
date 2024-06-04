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

// export async function getPosts(authorUsername, queryString) {
//   try {
//     const response = await axiosService.getPosts(authorUsername, queryString);

//     return response.data.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }

export async function createComment(comment) {
  const response = await axiosService.createComment(comment);
  return response.data.data;
}
