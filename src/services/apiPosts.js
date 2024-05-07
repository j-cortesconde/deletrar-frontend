// TODO: Might have to combine all apiPosts and axiosService
import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchPosts(query) {
  if (query === "") return null;
  const response = await axiosService.searchPosts(query);
  return response.data.data;
}

export async function getPost(postId) {
  try {
    if (!postId) return null;

    const response = await axiosService.getPost(postId);
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function createPost(post) {
  const response = await axiosService.createPost(post);
  return response.data.data;
}

export async function updatePost(postId, post) {
  const response = await axiosService.updatePost(postId, post);
  return response.data.data;
}

export async function deletePost(postId) {
  const response = await axiosService.deletePost(postId);
  return response.data.data;
}
