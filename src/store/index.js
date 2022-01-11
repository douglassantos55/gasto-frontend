import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    loading({ commit }) {
      commit("SET_LOADING", true);
    },
    stopLoading({ commit }) {
      commit("SET_LOADING", false);
    },
  },
});
