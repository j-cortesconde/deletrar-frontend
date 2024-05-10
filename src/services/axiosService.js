// TODO: Error handling. Ya hay una sugerencia en el comentario de App.js. Hay que sumarle:
//    1- La forma en que se manejan errores conocidos en frontend en useLogin
//    2- La forma en que se manejan errores desconocidos en frontend en useInviteFriend
//    3- Una forma genérica para manejo de errores desconocidos ya desde el backend
// FIXME: Esta estructura de servicio es inaceptable. Resolver
// TODO: Un logic delete, va como PATCH o como qué?
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

  async resetPassword({ password, passwordConfirm, token }) {
    const response = await axios({
      method: "PATCH",
      url: `${API_URL}/users/resetPassword/${token}`,
      data: { password, passwordConfirm },
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

  forgotPassword({ email }) {
    return axios({
      method: "POST",
      url: `${API_URL}/users/forgotPassword`,
      data: { email },
    });
  }

  searchUsers(query) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/search/${query}`,
    });
  }

  getUser(username) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/username/${username}`,
    });
  }

  getCurrentUser() {
    return axios({
      method: "GET",
      url: `${API_URL}/users/me`,
    });
  }

  reactivateAccount() {
    return axios({
      method: "PATCH",
      url: `${API_URL}/users/reactivateMe`,
    });
  }

  initializeAccount({ username }) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/users/initializeMe`,
      data: { username },
    });
  }

  searchPosts(query) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/search/${query}`,
    });
  }

  getPost(postId) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/id/${postId}`,
    });
  }

  getPosts(authorUsername) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/user/${authorUsername}`,
    });
  }

  createPost(post) {
    return axios({
      method: "POST",
      url: `${API_URL}/posts`,
      data: post,
    });
  }

  updatePost(postId, post) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/posts/id/${postId}`,
      data: post,
    });
  }
}

const axiosService = new AxiosService();

export default axiosService;
