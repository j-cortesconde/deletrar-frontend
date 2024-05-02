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

export async function getCurrentUser() {
  try {
    const response = await axiosService.getCurrentUser();
    return response.data.data;
  } catch (err) {
    throw new Error("You don't seem to be logged in");
  }
}

export async function reactivateAccount() {
  try {
    const response = await axiosService.reactivateAccount();
    return response.data.data;
  } catch (err) {
    throw new Error(
      "Error inesperado. Por favor vuelva a intentarlo más tarde.",
    );
  }
}
