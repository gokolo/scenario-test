import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;

const state = {
  token: undefined,
  user: undefined,
};

const getters = {
  token(state) {
    return state.token;
  },
  user(state) {
    return state.user;
  },
};

const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  unauthenticate(state) {
    state.token = undefined;
    state.user = undefined;
  },
};

const actions = {
  setToken(context, payload) {
    context.commit("setToken", payload);
  },
  setUser(context, payload) {
    context.commit("setUser", payload);
  },

  login(context, payload) {
    return axios({
      method: "POST",
      data: payload,
      url: `${BASE_URL}rest-auth/login/`,
    });
  },
  logout(context) {
    context.commit("unauthenticate");

    return axios({
      method: "POST",
      data: {},
      url: `${BASE_URL}rest-auth/logout/`,
    });
  },
  resetPassword(context, payload) {
    return axios({
      method: "POST",
      data: payload,
      url: `${BASE_URL}rest-auth/password/reset/`,
    });
  },
  getAuthenticatedUser() {
    return axios({
      method: "GET",
      data: {},
      url: `${BASE_URL}rest-auth/user/`,
    });
  },
  register(context, payload) {
    return axios({
      method: "POST",
      data: payload,
      url: `${BASE_URL}rest-auth/registration/`,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
