import axiosService from "./axiosService";

export async function getFeed({ pageParam = 1 }) {
  const response = await axiosService.getFeed(pageParam);
  return response.data.data;
}
