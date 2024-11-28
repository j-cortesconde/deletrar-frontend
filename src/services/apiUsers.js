import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchUsers(query) {
  if (query === "") return null;
  const response = await axiosService.searchUsers(query);
  return response.data.data;
}

export async function getUser(username) {
  const response = await axiosService.getUser(username);
  return response.data.data;
}

export async function getCurrentUser() {
  const response = await axiosService.getCurrentUser();
  return response.data.data;
}

export async function updateMe(data) {
  const response = await axiosService.updateMe(data);
  return response.data.data;
}

export async function reactivateAccount() {
  const response = await axiosService.reactivateAccount();
  return response.data.data;
}

export async function initializeAccount({ username }) {
  const response = await axiosService.initializeAccount({ username });
  return response.data.data;
}

export async function getFollowers(followedUsername, queryString) {
  const response = await axiosService.getFollowers(
    followedUsername,
    queryString,
  );
  return response.data.data;
}

export async function getFollowing(followerUsername, queryString) {
  const response = await axiosService.getFollowing(
    followerUsername,
    queryString,
  );
  return response.data.data;
}

export async function isFollower(ownUsername, otherUsername) {
  if (!ownUsername) return null;
  const response = await axiosService.isFollower(otherUsername);

  return response.data.data;
}

export async function amFollowing(ownUsername, otherUsername) {
  if (!ownUsername) return null;
  const response = await axiosService.amFollowing(otherUsername);

  return response.data.data;
}

export async function followUnfollowUser({ username, unfollow = false }) {
  const response = await axiosService.followUnfollowUser(username, unfollow);

  return response.data.data;
}

export async function saveUnsavePostCollection({
  docId,
  docType,
  unsave = false,
}) {
  const response = await axiosService.saveUnsavePostCollection(
    docId,
    docType,
    unsave,
  );

  return response.data.data;
}

export async function haveSaved(docId, docType) {
  const response = await axiosService.haveSaved(docId, docType);

  return response.data.data;
}
