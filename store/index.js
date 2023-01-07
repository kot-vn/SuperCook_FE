import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userToken from '@/store/modules/userToken'
const dataState = createPersistedState({
  paths: ['userToken.token'],
})

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    namespaced: true,
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { userToken },
    plugins: [dataState],
  })
