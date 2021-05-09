import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication";
import app from "./application";
import plan from "./plan";
import subscription from "./subscription";

import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin],
  modules: {
    authentication,
    app,
    plan,
    subscription,
  },
});
