import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { axiosInterceptor } from "./utils/requestInterceptors";
import Toasted from "vue-toasted";

axiosInterceptor();
Vue.use(Toasted, {
  iconPack: "mdi",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
