import { getField, updateField } from "vuex-map-fields";

const SET_PAGE = "SET_PAGE";
const CHANGE_PAGE = "CHANGE_PAGE";
const RESET_PAGE = "RESET_PAGE";
const PRE_PAGE = "PRE_PAGE";

export default {
  namespaced: true,
  strict: true,
  state: {
    pages: {
      page: 0,
      pages: 1,
      totalElements: 0,
    },
    currentPage: 1,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    SET_PAGE(state, newPage) {
      state.pages.page = newPage.page;
      state.pages.pages = newPage.pages;
      state.pages.totalElements = newPage.totalElements;
    },
    CHANGE_PAGE(state, newPage) {
      state.currentPage = newPage;
    },
    RESET_PAGE(state) {
      state.currentPage = 1;
    },
    NEXT_PAGE(state) {
      state.currentPage++;
    },
    PRE_PAGE(state) {
      state.currentPage--;
    },
  },
};
