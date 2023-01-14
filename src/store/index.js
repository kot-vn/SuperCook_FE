import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import adminGlobal from "./modules/admin/global";
import client from "./modules/client";

const dataState = createPersistedState({
  paths: ["adminGlobal.token"],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { adminGlobal, client },
  plugins: [dataState],
});
