// TODO: Error handling
import axios from "axios";
import { API_URL } from "../utils/constants";

class AxiosService {
  #jwt;
  constructor() {
    this.#jwt = localStorage.getItem("jwt");

    if (this.#jwt) {
      this.#setAuthHeader();
    }
  }

  #setAuthHeader() {
    axios.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${this.#jwt}`;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );
  }

  async login({ email, password }) {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users/login`,
      data: { email, password },
    });

    this.#jwt = response.data.token;

    return response;
  }

  searchPosts(query) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts?title[regex]=${query}`,
    });
  }

  getPost(postId) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/${postId}`,
    });
  }

  getUser(userId) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/id/${userId}`,
    });
  }
}

const axiosService = new AxiosService();

export default axiosService;
