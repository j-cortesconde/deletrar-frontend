import axios from "axios";
import { API_URL } from "../utils/constants";

// Shouldn't catch errors here?

export async function searchPosts(query) {
  if (query === "") return null;
  const response = await axios({
    method: "GET",
    url: `${API_URL}/posts?title[regex]=${query}`,
  });
  return response.data.data;
}
