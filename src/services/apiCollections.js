// TODO: Might have to combine all apiPosts and axiosService
import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function searchCollections(query) {
  if (query === "") return null;
  const response = await axiosService.searchCollections(query);
  return response.data.data;
}

export async function getCollection(collectionId) {
  if (!collectionId) return null;

  const response = await axiosService.getCollection(collectionId);
  return response.data.data;
}

export async function getCollections(collectorUsername, queryString) {
  const response = await axiosService.getCollections(
    collectorUsername,
    queryString,
  );

  return response.data.data;
}

export async function getOwnHiddenCollections(queryString) {
  const response = await axiosService.getOwnHiddenCollections(queryString);

  return response.data.data;
}

export async function getSavedCollections(username, queryString) {
  const response = await axiosService.getSavedCollections(
    username,
    queryString,
  );

  return response.data.data;
}

export async function createCollection(collection) {
  const response = await axiosService.createCollection(collection);
  return response.data.data;
}

export async function updateCollection(collectionId, data) {
  const response = await axiosService.updateCollection(collectionId, data);
  return response.data.data;
}

export async function addCollectionPost(collectionId, postId) {
  const response = await axiosService.addCollectionPost(collectionId, postId);
  return response.data.data;
}

export async function removeCollectionPost(collectionId, postId) {
  const response = await axiosService.removeCollectionPost(
    collectionId,
    postId,
  );
  return response.data.data;
}

export async function moveCollectionPost(collectionId, postId, position) {
  const response = await axiosService.moveCollectionPost(
    collectionId,
    postId,
    position,
  );
  return response.data.data;
}
