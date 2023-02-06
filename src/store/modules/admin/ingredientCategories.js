import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";
import pagy from "@/store/modules/admin/pagy";

const SET_INGREDIENT_CATEGORIES = "SET_INGREDIENT_CATEGORIES";
const RESET_INGREDIENT_CATEGORY = "RESET_INGREDIENT_CATEGORY";
const SET_INGREDIENT_CATEGORY = "SET_INGREDIENT_CATEGORY";

export default {
  namespaced: true,
  strict: true,
  state: {
    ingredientCategories: [],
    ingredientCategory: {
      categoryName: "",
      newIcon: null,
      icon: null,
    },
    searchValue: "",
  },
  getters: {
    getField,
  },
  actions: {
    async fetchIngredientCategories({ commit, state, dispatch }) {
      const query = {
        method: "GET",
        url: `ingredient-category/search?keyword=${state.searchValue}&page=${
          pagy.state.currentPage - 1
        }`,
      };
      await axios(query)
        .then((res) => {
          if (res.data.code === 0) {
            commit(SET_INGREDIENT_CATEGORIES, res.data.data.content);
            commit(
              "pagy/SET_PAGE",
              {
                page: res.data.data.number + 1,
                pages: res.data.data.totalPages,
              },
              { root: true }
            );
          } else {
            dispatch("adminGlobal/callAlert", res.data.data, {
              root: true,
            });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async getIngredientCategory({ commit, state, dispatch }, id) {
      const query = {
        method: "GET",
        url: `ingredient-category/${id}`,
      };
      await axios(query)
        .then((res) => {
          if (res.data.code === 0) {
            commit(SET_INGREDIENT_CATEGORY, res.data.data);
          } else {
            dispatch("adminGlobal/callAlert", res.data.data, {
              root: true,
            });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async deleteIngredientCategories({ commit, state, dispatch }, id) {
      const query = {
        method: "DELETE",
        url: `ingredient-category/delete/${id}`,
      };
      await axios(query)
        .then((res) => {
          if (res.data.code === 0) {
            if (state.ingredientCategories.length === 1) {
              commit("pagy/RESET_PAGE", null, { root: true });
            }
          } else {
            dispatch("adminGlobal/callAlert", res.data.data, {
              root: true,
            });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async addIngredientCategory({ commit, state, dispatch }) {
      let formData = new FormData();
      formData.append("categoryName", state.ingredientCategory.categoryName);
      formData.append("newIcon", state.ingredientCategory.newIcon);
      await axios
        .post(`ingredient-category/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            commit(RESET_INGREDIENT_CATEGORY);
          } else {
            dispatch("adminGlobal/callAlert", res.data.data, {
              root: true,
            });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async updateIngredientCategory({ commit, state, dispatch }, id) {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("categoryName", state.ingredientCategory.categoryName);
      if (
        state.ingredientCategory.icon &&
        state.ingredientCategory.newIcon == null
      ) {
        formData.append("icon", state.ingredientCategory.icon);
      } else {
        formData.append("newIcon", state.ingredientCategory.newIcon);
      }
      await axios
        .post(`ingredient-category/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            commit(RESET_INGREDIENT_CATEGORY);
          } else {
            dispatch("adminGlobal/callAlert", res.data.data, {
              root: true,
            });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
  },
  mutations: {
    updateField,
    SET_INGREDIENT_CATEGORIES(state, payload) {
      state.ingredientCategories = payload;
    },
    RESET_INGREDIENT_CATEGORY(state) {
      state.ingredientCategory.categoryName = "";
      state.ingredientCategory.newIcon = null;
      state.ingredientCategory.icon = null;
    },
    SET_INGREDIENT_CATEGORY(state, payload) {
      state.ingredientCategory.categoryName = payload.categoryName;
      state.ingredientCategory.icon = payload.icon;
    },
  },
};
