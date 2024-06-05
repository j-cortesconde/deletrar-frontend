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

  getPosts(authorUsername, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/user/${authorUsername}?${queryString}`,
    });
  }

  getOwnHiddenPosts(queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/posts/ownHidden?${queryString}`,
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

  getFollowers(followedUsername, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/followers/${followedUsername}?${queryString}`,
    });
  }

  getFollowing(followerUsername, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/following/${followerUsername}?${queryString}`,
    });
  }

  isFollower(ownUsername, otherUsername) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/isFollower/${ownUsername}/${otherUsername}`,
    });
  }

  amFollowing(ownUsername, otherUsername) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/amFollowing/${ownUsername}/${otherUsername}`,
    });
  }

  followUnfollowUser(username, unfollow) {
    if (unfollow)
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/id/${username}/unfollow`,
      });
    else {
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/id/${username}/follow`,
      });
    }
  }

  searchCollections(query) {
    return axios({
      method: "GET",
      url: `${API_URL}/collections/search/${query}`,
    });
  }

  getCollection(collectionId) {
    return axios({
      method: "GET",
      url: `${API_URL}/collections/id/${collectionId}`,
    });
  }

  getCollections(collectorUsername, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/collections/user/${collectorUsername}?${queryString}`,
    });
  }

  getOwnHiddenCollections(queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/collections/ownHidden?${queryString}`,
    });
  }

  createCollection(collection) {
    return axios({
      method: "POST",
      url: `${API_URL}/collections`,
      data: collection,
    });
  }

  updateCollection(collectionId, collection) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/collections/id/${collectionId}`,
      data: collection,
    });
  }

  addCollectionPost(collectionId, postId) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/collections/id/${collectionId}/addPost`,
      data: { postId },
    });
  }

  removeCollectionPost(collectionId, postId) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/collections/id/${collectionId}/removePost`,
      data: { postId },
    });
  }

  moveCollectionPost(collectionId, postId, position) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/collections/id/${collectionId}/movePost`,
      data: { postId, position },
    });
  }

  createComment(comment) {
    return axios({
      method: "POST",
      url: `${API_URL}/comments`,
      data: comment,
    });
  }

  getComments(type, id) {
    return axios({
      method: "GET",
      url: `${API_URL}/comments/${type}/${id}`,
    });
  }
}

const axiosService = new AxiosService();

export default axiosService;
