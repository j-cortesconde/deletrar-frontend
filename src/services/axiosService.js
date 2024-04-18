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
      (config) => {
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

    this.#setAuthHeader();

    return response;
  }

  getUser(userId) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/id/${userId}`,
    });
  }

  getCurrentUser() {
    return axios.get(`${API_URL}/users/me`);
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

  createPost(post) {
    return axios({
      method: "POST",
      url: `${API_URL}/posts`,
      data: post,
    });
  }
}

const axiosService = new AxiosService();

export default axiosService;
