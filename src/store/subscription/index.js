import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL + "/api/v1/";

const state = {
  subscriptions: [],
};

const getters = {
  subscriptions(state) {
    return state.subscriptions;
  },
};

const mutations = {
  setSubscriptions(state, payload) {
    state.subscriptions = payload;
  },
};

const actions = {
  getSubscriptions(context) {
    axios({
      method: "GET",
      data: {},
      url: `${BASE_URL}subscriptions/`,
    })
      .then((response) => {
        context.commit("setSubscriptions", response.data);
      })
      .catch((error) => {
        console.log("Error getSubscriptions:", error, error.data);
      });
  },

  updateSubscription(context, payload) {
    axios({
      method: "PATCH",
      data: payload,
      url: `${BASE_URL}subscriptions/${payload.id}/`,
    })
      .then(() => {
        context.dispatch("getSubscriptions");
      })
      .catch((error) => {
        console.log("Error updateSubscription:", error, error.data);
      });
  },

  createSubscription(context, payload) {
    axios({
      method: "POST",
      data: payload,
      url: `${BASE_URL}subscriptions/`,
    })
      .then(() => {
        context.dispatch("getSubscriptions");
      })
      .catch((error) => {
        console.log("Error updateSubscription:", error, error.data);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
