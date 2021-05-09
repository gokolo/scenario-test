import axios from "axios";
import store from "../store";

export function axiosInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      const token = store.getters.token;
      if (token) {
        config.headers["Authorization"] = "Token " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
