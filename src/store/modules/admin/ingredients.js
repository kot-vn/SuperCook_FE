import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";
import pagy from "@/store/modules/admin/pagy";

const SET_INGREDIENTS = "SET_INGREDIENTS";
const RESET_INGREDIENT = "RESET_INGREDIENT";
const SET_INGREDIENT = "SET_INGREDIENT";
const SET_INGREDIENT_CATEGORIES = "SET_INGREDIENT_CATEGORIES";

export default {
  namespaced: true,
  strict: true,
  state: {
    ingredients: [],
    ingredientCategories: [],
    ingredient: {
      name: null,
      ingredientCategoryId: null,
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
        url: `ingredient-category/getAll`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENT_CATEGORIES, res.data.data);
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async fetchIngredients({ commit, state }) {
      const query = {
        method: "GET",
        url: `ingredient/search?keyword=${state.searchValue}&page=${
          pagy.state.currentPage - 1
        }`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENTS, res.data.data.content);
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
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async getIngredient({ commit, state }, id) {
      const query = {
        method: "GET",
        url: `ingredient/${id}`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENT, res.data.data);
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async deleteIngredient({ commit, state }, id) {
      const query = {
        method: "DELETE",
        url: `ingredient/delete/${id}`,
      };
      await axios(query)
        .then((res) => {
          if (state.ingredients.length === 1) {
            commit("pagy/RESET_PAGE", null, { root: true });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async addIngredient({ commit, state, dispatch }) {
      await axios
        .post("ingredient/add", {
          name: state.ingredient.name,
          ingredientCategoryId: state.ingredient.ingredientCategoryId.id,
        })
        .then((res) => {
          if (res.data.code == 0) {
            commit(RESET_INGREDIENT);
            commit("adminGlobal/RESET_ERROR", null, { root: true });
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
    async updateIngredient({ commit, state, dispatch }, id) {
      await axios
        .post("ingredient/update", {
          id: id,
          name: state.ingredient.name,
          ingredientCategoryId: state.ingredient.ingredientCategoryId.id,
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            commit(RESET_INGREDIENT);
            commit("adminGlobal/RESET_ERROR", null, { root: true });
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
    SET_INGREDIENTS(state, payload) {
      state.ingredients = payload;
    },
    RESET_INGREDIENT(state) {
      state.ingredient.name = null;
      state.ingredient.ingredientCategoryId = null;
    },
    SET_INGREDIENT_CATEGORIES(state, payload) {
      state.ingredientCategories = payload;
    },
    SET_INGREDIENT(state, payload) {
      state.ingredient.name = payload.name;
      state.ingredient.ingredientCategoryId = payload.ingredientCategoryDto;
    },
  },
};
