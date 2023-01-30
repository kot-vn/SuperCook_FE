import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";

const CLEAR_TOKEN = "CLEAR_TOKEN";
const SET_TOKEN = "SET_TOKEN";
const SET_ERROR = "SET_ERROR";
const RESET_ERROR = "RESET_ERROR";

export default {
  namespaced: true,
  strict: true,
  state: {
    token: null,
    email: "",
    emailBlurred: false,
    valid: false,
    submitted: false,
    password: "",
    passwordBlurred: false,
    errorMsg: null,
  },
  getters: {
    getField,
  },
  actions: {
    setToken({ commit }, payload) {
      commit(SET_TOKEN, payload);
    },
    clearToken({ commit }) {
      commit(CLEAR_TOKEN);
    },
    async adminAuthenticate({ commit, state }) {
      commit(CLEAR_TOKEN);
      await axios
        .post("user/signin", {
          username: state.email,
          password: state.password,
        })
        .then((res) => {
          if (res.status == 200) {
            commit(SET_TOKEN, res.data.data.token);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async callAlert({ commit, state }, payload) {
      await commit(SET_ERROR, payload);
      alert(state.errorMsg);
    },
  },
  mutations: {
    updateField,
    SET_ERROR(state, payload) {
      state.errorMsg = payload;
    },
    RESET_ERROR(state) {
      state.errorMsg = null;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
    },
  },
};
