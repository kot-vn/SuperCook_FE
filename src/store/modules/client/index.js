import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";
import pagy from "@/store/modules/admin/pagy";
import qs from "qs";

const SET_INGREDIENT_CATEGORIES = "SET_INGREDIENT_CATEGORIES";
const SET_INGREDIENTS = "SET_INGREDIENTS";
const SET_RECIPES = "SET_RECIPES";
const SET_RECIPE = "SET_RECIPE";

export default {
  namespaced: true,
  strict: true,
  state: {
    ingredientCategories: [],
    ingredients: [],
    ingredientSearchValue: [],
    recipes: null,
  },
  getters: {
    getField,
  },
  actions: {
    async fetchIngredientCategories({ commit }) {
      const query = {
        method: "GET",
        url: "ingredient-category/getAll",
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENT_CATEGORIES, res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchRecipes({ commit, state, dispatch }) {
      const ingredients = state.ingredientSearchValue.map((a) => a.id);
      await axios
        .post(`recipe/get-recipes?page=${pagy.state.currentPage - 1}`, {
          ingredientIdList: ingredients,
        })
        .then((res) => {
          commit(SET_RECIPES, res.data.data.content);
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
    async fetchIngredients({ commit }) {
      const query = {
        method: "GET",
        url: "ingredient/getAll",
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENTS, res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    updateField,
    SET_INGREDIENT_CATEGORIES(state, payload) {
      state.ingredientCategories = payload;
    },
    SET_INGREDIENTS(state, payload) {
      state.ingredients = payload;
    },
    SET_RECIPES(state, payload) {
      state.recipes = payload;
    },
    SET_RECIPE(state, payload) {
      state.recipe = payload;
    },
  },
};
