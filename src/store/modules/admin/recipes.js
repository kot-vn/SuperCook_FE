import { getField, updateField } from "vuex-map-fields";
import axios from "@/plugins/axios";
import pagy from "@/store/modules/admin/pagy";

const SET_RECIPES = "SET_RECIPES";
const RESET_RECIPE = "RESET_RECIPE";
const SET_RECIPE = "SET_RECIPE";
const SET_INGREDIENTS = "SET_INGREDIENTS";

export default {
  namespaced: true,
  strict: true,
  state: {
    recipes: [],
    ingredients: [],
    recipe: {
      title: null,
      image: null,
      newImage: null,
      content: null,
      ingredientDtoList: null,
    },

    searchValue: "",
  },
  getters: {
    getField,
  },
  actions: {
    async fetchIngredients({ commit, state }) {
      const query = {
        method: "GET",
        url: `ingredient/getAll`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_INGREDIENTS, res.data.data);
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async fetchRecipes({ commit, state }) {
      const query = {
        method: "GET",
        url: `recipe/search?keyword=${state.searchValue}&page=${
          pagy.state.currentPage - 1
        }`,
      };
      await axios(query)
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
    async getRecipe({ commit, state }, id) {
      const query = {
        method: "GET",
        url: `recipe/${id}`,
      };
      await axios(query)
        .then((res) => {
          commit(SET_RECIPE, res.data.data);
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async deleteRecipe({ commit, state }, id) {
      const query = {
        method: "DELETE",
        url: `recipe/delete/${id}`,
      };
      await axios(query)
        .then((res) => {
          if (state.recipes.length === 1) {
            commit("pagy/RESET_PAGE", null, { root: true });
          }
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async addRecipe({ commit, state, dispatch }) {
      let formData = new FormData();
      formData.append("title", state.recipe.title);
      formData.append("content", state.recipe.content);
      formData.append("newImage", state.recipe.newImage);
      state.recipe.ingredientDtoList.forEach((value, index) => {
        formData.append("ingredientModelList[" + index + "].id", value.id);
      });
      await axios
        .post(`recipe/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          commit(RESET_RECIPE);
        })
        .catch((e) => {
          dispatch("adminGlobal/callAlert", e, {
            root: true,
          });
        });
    },
    async updateRecipe({ commit, state }, id) {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("title", state.recipe.title);
      formData.append("content", state.recipe.content);
      state.recipe.ingredientDtoList.forEach((value, index) => {
        formData.append("ingredientModelList[" + index + "].id", value.id);
      });
      if (state.recipe.image && state.recipe.newImage == null) {
        formData.append("image", state.recipe.image);
      } else {
        formData.append("newImage", state.recipe.newImage);
      }
      await axios
        .post(`recipe/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          commit(RESET_RECIPE);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mutations: {
    updateField,
    SET_RECIPES(state, payload) {
      state.recipes = payload;
    },
    RESET_RECIPE(state) {
      state.recipe.title = null;
      state.recipe.image = null;
      state.recipe.newImage = null;
      state.recipe.content = null;
      state.recipe.ingredientDtoList = null;
    },
    SET_INGREDIENTS(state, payload) {
      state.ingredients = payload;
    },
    SET_RECIPE(state, payload) {
      state.recipe.title = payload.title;
      state.recipe.image = payload.image;
      state.recipe.newImage = payload.newImage;
      state.recipe.content = payload.content;
      state.recipe.ingredientDtoList = payload.ingredientDtoList;
    },
  },
};
