import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL + "api/";

const state = {
  applications: [],
};

const getters = {
  applications(state) {
    return state.applications;
  },
};

const mutations = {
  setApplications(state, payload) {
    state.applications = payload;
  },
};

const actions = {
  getApplications(context, id) {
    return axios({
      method: "GET",
      headers: context.getters.jwt,
      data: {},
      url: `${BASE_URL}apps/${id}`,
    });
  },
  createApplication(context, payload) {
    return axios({
      method: "POST",
      headers: context.getters.jwt,
      data: payload,
      url: `${BASE_URL}apps/`,
    });
  },
  updateApplication(context, payload) {
    return axios({
      method: "PATCH",
      headers: context.getters.jwt,
      data: payload.data,
      url: `${BASE_URL}apps/${payload.id}/`,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
