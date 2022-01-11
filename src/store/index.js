import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    loading: true,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    loading({ commit }) {
      commit("SET_LOADING", true);
    },
    stopLoading({ commit }) {
      commit("SET_LOADING", false);
    },
  },
});
