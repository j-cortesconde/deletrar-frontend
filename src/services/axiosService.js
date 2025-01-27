// TODO: Error handling. Ya hay una sugerencia en el comentario de App.js. Hay que sumarle:
//    1- La forma en que se manejan errores conocidos en frontend en useLogin
//    2- La forma en que se manejan errores desconocidos en frontend en useInviteFriend
//    3- Una forma genérica para manejo de errores desconocidos ya desde el backend
// FIXME: Esta estructura de servicio es inaceptable. Resolver
// TODO: Un logic delete, va como PATCH o como qué?
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

  updateMe(data) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/users/updateMe`,
      data,
    });
  }

  reactivateAccount() {
    return axios({
      method: "PATCH",
      url: `${API_URL}/users/reactivateMe`,
    });
  }

  async deactivateAccount() {
    const response = await axios({
      method: "PATCH",
      url: `${API_URL}/users/deactivateMe`,
    });

    this.#jwt = undefined;

    this.#clearAuthHeader();

    return response;
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

  // TODO: Rview problematic order. Hook, api and service in posts, but calling to route, controller, service and model in users. (same with getSavedCollections)
  getSavedPosts(username, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/savedPosts/user/${username}?${queryString}`,
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

  isFollower(otherUsername) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/isFollower/${otherUsername}`,
    });
  }

  amFollowing(otherUsername) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/amFollowing/${otherUsername}`,
    });
  }

  followUnfollowUser(username, unfollow) {
    if (unfollow)
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/unfollow/${username}`,
      });
    else {
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/follow/${username}`,
      });
    }
  }

  saveUnsavePostCollection(docId, docType, unsave) {
    if (unsave)
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/${docType}/${docId}/unsave`,
      });
    else {
      return axios({
        method: "PATCH",
        url: `${API_URL}/users/${docType}/${docId}/save`,
      });
    }
  }

  haveSaved(docId, docType) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/haveSaved/${docType}/${docId}`,
    });
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

  // TODO: Rview problematic order. Hook, api and service in collections, but calling to route, controller, service and model in users. (same with getSavedPosts)
  getSavedCollections(username, queryString) {
    return axios({
      method: "GET",
      url: `${API_URL}/users/savedCollections/user/${username}?${queryString}`,
    });
  }

  createCollection(collection) {
    return axios({
      method: "POST",
      url: `${API_URL}/collections`,
      data: collection,
    });
  }

  updateCollection(collectionId, data) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/collections/id/${collectionId}`,
      data,
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

  updateComment(commentId, comment) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/comments/id/${commentId}`,
      data: comment,
    });
  }

  getComment(commentId) {
    return axios({
      method: "GET",
      url: `${API_URL}/comments/id/${commentId}`,
    });
  }

  getComments(type, id, page) {
    return axios({
      method: "GET",
      url: `${API_URL}/comments/${type}/${id}?page=${page}`,
    });
  }

  getCommentThread(commentId) {
    return axios({
      method: "GET",
      url: `${API_URL}/comments/thread/${commentId}`,
    });
  }

  getConversation(username, pageParam) {
    return axios({
      method: "GET",
      url: `${API_URL}/conversations/with/${username}`,
      params: { page: pageParam },
    });
  }

  getConversations(pageParam) {
    return axios({
      method: "GET",
      url: `${API_URL}/conversations/getOwn`,
      params: { page: pageParam },
    });
  }

  sendMessage(addressee, message) {
    return axios({
      method: "PATCH",
      url: `${API_URL}/conversations/sendMessage/user/${addressee}`,
      data: { message },
    });
  }

  getFeed(pageParam = 1) {
    return axios({
      method: "GET",
      url: `${API_URL}/feed`,
      params: { page: pageParam },
    });
  }

  getShareds(sharerUsername, pageParam = 1) {
    return axios({
      method: "GET",
      url: `${API_URL}/shareds/user/${sharerUsername}`,
      params: { page: pageParam },
    });
  }

  createShared(newShared) {
    return axios({
      method: "POST",
      url: `${API_URL}/shareds`,
      data: newShared,
    });
  }
}

const axiosService = new AxiosService();

export default axiosService;
