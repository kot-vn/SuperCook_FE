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
    async fetchIngredientCategories({ commit, state }) {
      const query = {
        method: "GET",
        url: `ingredient-category/search?keyword=${state.searchValue}&page=${
          pagy.state.currentPage - 1
        }`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENT_CATEGORIES, res.data.data.content);
          commit(
            "pagy/SET_PAGE",
            {
              page: res.data.data.number + 1,
              pages: res.data.data.totalPages,
            },
            { root: true }
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getIngredientCategory({ commit, state }, id) {
      const query = {
        method: "GET",
        url: `ingredient-category/${id}`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENT_CATEGORY, res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async deleteIngredientCategories({ commit, state }, id) {
      const query = {
        method: "DELETE",
        url: `ingredient-category/delete/${id}`,
      };
      await axios(query)
        .then((res) => {
          if (state.ingredientCategories.length === 1) {
            commit("pagy/RESET_PAGE", null, { root: true });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async addIngredientCategory({ commit, state }) {
      let formData = new FormData();
      formData.append("categoryName", state.ingredientCategory.categoryName);
      formData.append("newIcon", state.ingredientCategory.newIcon);
      await axios
        .post(`ingredient-category/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          commit(RESET_INGREDIENT_CATEGORY);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async updateIngredientCategory({ commit, state }, id) {
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
        .then(() => {
          commit(RESET_INGREDIENT_CATEGORY);
        })
        .catch((e) => {
          console.log(e);
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
