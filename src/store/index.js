import { getField, updateField } from "vuex-map-fields";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import adminGlobal from "./modules/admin/global";
import pagy from "./modules/admin/pagy";
import ingredientCategories from "./modules/admin/ingredientCategories";
import ingredients from "./modules/admin/ingredients";
import recipes from "./modules/admin/recipes";
import client from "./modules/client";

const dataState = createPersistedState({
  paths: ["adminGlobal.token"],
});
const SET_LOADING = "SET_LOADING";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLoading: false,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    SET_LOADING(state) {
      state.showLoading = !state.showLoading;
    },
  },
  actions: {
    setLoading({ commit }) {
      commit(SET_LOADING);
    },
  },
  modules: {
    adminGlobal,
    client,
    pagy,
    ingredientCategories,
    ingredients,
    recipes,
  },
  plugins: [dataState],
});
