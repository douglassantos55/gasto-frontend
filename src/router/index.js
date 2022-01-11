import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    props: true,
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "search",
        name: "Search",
        component: () =>
          import(/* webpackChunkName: "search" */ "../views/SearchDialog.vue"),
      },
      {
        path: "period",
        name: "PeriodDialog",
        component: () =>
          import(/* webpackChunkName: "period" */ "../views/PeriodDialog.vue"),
      },
      {
        props: (route) => ({ ...route.params, type: route.query.type }),
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
