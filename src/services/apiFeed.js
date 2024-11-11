import axiosService from "./axiosService";

export async function getFeed(pageParam) {
  try {
    const response = await axiosService.getFeed(pageParam);
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
