import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/Register.vue"),
      },
    ],
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
        path: "change-password",
        name: "PasswordDialog",
        component: () =>
          import(
            /* webpackChunkName: "password" */ "../views/PasswordDialog.vue"
          ),
      },
      {
        path: "friends",
        name: "FriendsDialog",
        component: () =>
          import(
            /* webpackChunkName: "friends" */ "../views/FriendsDialog.vue"
          ),
      },
      {
        path: "add-friend",
        name: "FriendDialog",
        component: () =>
          import(
            /* webpackChunkName: "add-friend" */ "../views/FriendDialog.vue"
          ),
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
