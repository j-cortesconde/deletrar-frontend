// TODO: Error handling
import axios from "axios";
import { API_URL } from "../utils/constants";

class AxiosService {
  #jwt;
  #requestInterceptor;

  constructor() {
    this.#jwt = localStorage.getItem("jwt");

    if (this.#jwt) {
      this.#setAuthHeader();
    }
  }

  #setAuthHeader() {
    this.#requestInterceptor = axios.interceptors.request.use(
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

  #clearAuthHeader() {
    axios.interceptors.request.eject(this.#requestInterceptor);
  }

  requestAccount({ email, name, request, toWhom }) {
    return axios({
      method: "POST",
      url: `${API_URL}/users/requestInvite`,
      data: { email, name, request, toWhom },
    });
  }

  inviteFriend({ email, name }) {
    return axios({
      method: "POST",
      url: `${API_URL}/users/invite`,
      data: { email, name },
    });
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

  async logout() {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users/logout`,
    });

    this.#jwt = undefined;

    this.#clearAuthHeader();

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
      url: `${API_URL}/posts/search/${query}`,
    });
  }

  searchUsers(query) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/search/${query}`,
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
