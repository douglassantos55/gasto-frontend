import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import axios from "@/axios";

const routes = [
  {
    path: "/login",
    name: "Login",
    beforeEnter: () =>
      axios
        .head("/friends")
        .then(() => ({ name: "Home" }))
        .catch(() => true),
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: () =>
      axios
        .head("/friends")
        .then(() => true)
        .catch(() => ({ name: "Login" })),
    children: [
      {
        path: "search",
        name: "Search",
        component: () =>
          import(/* webpackChunkName: "search" */ "../views/About.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
