import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";

const SET_INGREDIENT_CATEGORIES = "SET_INGREDIENT_CATEGORIES";
const SET_INGREDIENTS = "SET_INGREDIENTS";

export default {
  namespaced: true,
  strict: true,
  state: {
    ingredientCategories: [],
    ingredients: [],
    ingredientSearchValue: [],
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
  },
};
