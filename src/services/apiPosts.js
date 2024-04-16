import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchPosts(query) {
  if (query === "") return null;
  const response = await axiosService.searchPosts(query);
  return response.data.data;
}

export async function getPost(postId) {
  const response = await axiosService.getPost(postId);
  return response.data.data;
}
