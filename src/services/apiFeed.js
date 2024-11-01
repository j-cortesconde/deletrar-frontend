import axiosService from "./axiosService";

export async function getFeed() {
  try {
    const response = await axiosService.getFeed();
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
