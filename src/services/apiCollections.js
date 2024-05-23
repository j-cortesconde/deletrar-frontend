// TODO: Might have to combine all apiPosts and axiosService
import axiosService from "./axiosService";

// Shouldn't catch errors here?

// export async function searchPosts(query) {
//   if (query === "") return null;
//   const response = await axiosService.searchPosts(query);
//   return response.data.data;
// }

export async function getCollection(collectionId) {
  try {
    if (!collectionId) return null;

    const response = await axiosService.getCollection(collectionId);
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// export async function getPosts(authorUsername, queryString) {
//   try {
//     const response = await axiosService.getPosts(authorUsername, queryString);

//     return response.data.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }

export async function createCollection(collection) {
  const response = await axiosService.createCollection(collection);
  return response.data.data;
}

export async function updateCollection(collectionId, collection) {
  console.log(collectionId, collection);
  const response = await axiosService.updateCollection(
    collectionId,
    collection,
  );
  return response.data.data;
}
