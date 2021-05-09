import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL + "/api/v1/";

const state = {
  apps: [],
};

const getters = {
  apps(state) {
    return state.apps.sort(function (a, b) {
      return a.created_at - b.created_at;
    });
  },
};

const mutations = {
  setApps(state, payload) {
    state.apps = payload;
  },
};

const actions = {
  getApps(context) {
    axios({
      method: "GET",
      data: {},
      url: `${BASE_URL}apps/`,
    })
      .then((response) => {
        context.commit("setApps", response.data);
      })
      .catch((error) => {
        console.log("Error getApps:", error, error.data);
      });
  },

  createApp(context, payload) {
    return axios({
      method: "POST",
      data: payload,
      url: `${BASE_URL}apps/`,
    });
  },

  updateApp(context, payload) {
    axios({
      method: "PATCH",
      data: payload,
      url: `${BASE_URL}apps/${payload.id}/`,
    })
      .then((response) => {
        console.log("App updated", response.data);
        // TODO ALERT
        let allApps = context.state.apps;
        context.commit("setApps", [
          ...allApps.filter((el) => el.id != payload.id),
          response.data,
        ]);
      })
      .catch((error) => {
        console.log("Error in updating app:", error, error.data);
      });
  },

  deleteApp(context, id) {
    axios({
      method: "DELETE",
      url: `${BASE_URL}apps/${id}/`,
    })
      .then((response) => {
        console.log("App deleted", response.data);
        // TODO ALERT
        let allApps = context.state.apps;
        context.commit(
          "setApps",
          allApps.filter((el) => el.id != id)
        );
      })
      .catch((error) => {
        console.log("Error in delete app:", error, error.data);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
