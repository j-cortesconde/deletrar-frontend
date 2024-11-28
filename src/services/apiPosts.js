// TODO: Might have to combine all apiPosts and axiosService
import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchPosts(query) {
  if (query === "") return null;
  const response = await axiosService.searchPosts(query);
  return response.data.data;
}

export async function getPost(postId) {
  if (!postId) return null;

  const response = await axiosService.getPost(postId);
  return response.data.data;
}

export async function getPosts(authorUsername, queryString) {
  const response = await axiosService.getPosts(authorUsername, queryString);

  return response.data.data;
}

export async function getOwnHiddenPosts(queryString) {
  const response = await axiosService.getOwnHiddenPosts(queryString);

  return response.data.data;
}

export async function getSavedPosts(username, queryString) {
  const response = await axiosService.getSavedPosts(username, queryString);

  return response.data.data;
}

export async function createPost(post) {
  const response = await axiosService.createPost(post);
  return response.data.data;
}

export async function updatePost(postId, post) {
  const response = await axiosService.updatePost(postId, post);
  return response.data.data;
}
