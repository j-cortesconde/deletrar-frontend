import axios from "axios";
import { API_URL } from "../utils/constants";

// Shouldn't catch errors here?

export async function getUser(UserId) {
  const response = await axios({
    method: "GET",
    url: `${API_URL}/users/id/${UserId}`,
  });
  return response.data.data;
}
