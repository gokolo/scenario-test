import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL + "/api/v1/";

const state = {
  plans: [],
};

const getters = {
  plans(state) {
    return state.plans;
  },
};

const mutations = {
  setPlans(state, payload) {
    state.plans = payload;
  },
};

const actions = {
  getPlans(context) {
    axios({
      method: "GET",
      data: {},
      url: `${BASE_URL}plans/`,
    })
      .then((response) => {
        context.commit("setPlans", response.data);
      })
      .catch((error) => {
        console.log("Error getPlans:", error, error.data);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
