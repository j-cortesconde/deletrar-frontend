import axiosService from "./axiosService";

// Shouldn't catch errors here?

export async function getUser(userId) {
  const response = await axiosService.getUser(userId);
  return response.data.data;
}
