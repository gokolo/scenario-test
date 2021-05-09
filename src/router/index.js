import Vue from "vue";
import VueRouter from "vue-router";
import UserDashboard from "../views/UserDashboard.vue";
import Store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/apps/create",
    name: "CreateApp",
    component: () => import("../views/application/CreateApp.vue"),
  },
  { path: "*", redirect: "/dashboard" },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["Login"];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = Boolean(Store.getters.user);

  if (authRequired && loggedIn) {
    return next();
  } else if (authRequired && !loggedIn) {
    return next("/login");
  } else {
    if (from.name != to.name) {
      return next();
    }
  }
});

export default router;
