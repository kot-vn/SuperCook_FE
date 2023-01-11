import { getField, updateField } from 'vuex-map-fields'
import axios from 'axios'

const SET_INGREDIENT_CATEGORIES = 'SET_INGREDIENT_CATEGORIES'

export default {
  namespaced: true,
  strict: true,
  state: () => ({
    ingredientCategories: [],
  }),
  getters: {
    getField,
  },
  actions: {
    async fetchIngredientCategories({ commit }) {
      const brandsQuery = {
        method: 'GET',
        url: 'http://3.0.99.90:8085/api/v1/ingredient-category/getAll',
      }
      await axios(brandsQuery)
        .then((res) => {
          commit(SET_INGREDIENT_CATEGORIES, res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mutations: {
    updateField,
    SET_INGREDIENT_CATEGORIES(state, payload) {
      state.ingredientCategories = payload
    },
  },
}
