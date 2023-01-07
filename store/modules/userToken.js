export default {
  namespaced: true,
  strict: true,
  state: {
    token: null,
  },
  getters: {},
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    clearToken(state) {
      state.token = ''
    },
  },
  actions: {},
}
