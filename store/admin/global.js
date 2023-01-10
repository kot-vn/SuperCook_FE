import { getField, updateField } from 'vuex-map-fields'

const CLEAR_TOKEN = 'CLEAR_TOKEN'
const SET_TOKEN = 'SET_TOKEN'

export default {
  namespaced: true,
  strict: true,
  state: () => ({
    token: null,
  }),
  getters: {
    getField,
  },
  actions: {
    setToken({ commit }, payload) {
      commit(SET_TOKEN, payload)
    },
    clearToken({ commit }) {
      commit(CLEAR_TOKEN)
    },
  },
  mutations: {
    updateField,
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    CLEAR_TOKEN(state) {
      state.token = null
    },
  },
}
