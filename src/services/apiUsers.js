import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchUsers(query) {
  if (query === "") return null;
  const response = await axiosService.searchUsers(query);
  return response.data.data;
}

export async function getUser(userId) {
  const response = await axiosService.getUser(userId);
  return response.data.data;
}
