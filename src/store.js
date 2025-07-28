import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      theme: 'light', // Default theme
      sidebarPosition: 'left', // Default sidebar position
    };
  },
  mutations: {
    setTheme(state, newTheme) {
      state.theme = newTheme;
    },
    setSidebarPosition(state, position) {
      state.sidebarPosition = position; // Update sidebar position
    },
  },
  actions: {
    changeTheme({ commit }, newTheme) {
      commit('setTheme', newTheme);
    },
    changeSidebarPosition({ commit }, position) {
      commit('setSidebarPosition', position); // Update sidebar position
    },
  },
  getters: {
    theme(state) {
      return state.theme;
    },
    sidebarPosition(state) {
      return state.sidebarPosition; // Get sidebar position
    },
  },
});

export default store;
