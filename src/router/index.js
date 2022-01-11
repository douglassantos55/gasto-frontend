import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import axios from "@/utils/axios";

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
      {
        path: "period",
        name: "PeriodDialog",
        component: () =>
          import(/* webpackChunkName: "period" */ "../views/PeriodDialog.vue"),
      },
      {
        props: true,
        path: "expense/:id?",
        name: "ExpenseDialog",
        component: () =>
          import(
            /* webpackChunkName: "expense" */ "../views/ExpenseDialog.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
