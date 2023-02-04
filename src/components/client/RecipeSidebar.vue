<template>
  <div>
    <b-sidebar
      id="recipeSidebar"
      title="Sidebar"
      backdrop
      no-header
      width="450px"
      right
      shadow
    >
      <div class="recipe-detail">
        <section class="recipe-detail-header w-100 position-relative">
          <div
            v-b-toggle.recipeSidebar
            class="close-sidebar-btn font-weight-bold position-absolute bg-white d-flex justify-content-center align-items-center rounded-circle"
          >
            <span class="fa-solid fa-xmark"></span>
          </div>
          <img class="w-100 h-100" :src="recipe.image" alt="" />
        </section>
        <section class="recipe-detail-body px-4 w-100">
          <div
            class="shadow p-3 bg-white overflow-hidden font-weight-bold rounded position-relative recipe-title"
          >
            {{ recipe.title }}
          </div>
          <div class="recipe-ingredients">
            <div>
              <b-card class="mb-4">
                <b-table
                  responsive
                  show-empty
                  hover
                  :fields="fields"
                  :items="content"
                ></b-table>
              </b-card>
            </div>
          </div>
        </section>
        <section class="more-recipe px-4 w-100" v-if="recipes">
          <p class="font-weight-bold">You might also like</p>
          <div v-if="recipesData.slice(1, 6).length > 0">
            <template v-for="(recipeItem, index) in recipesData.slice(1, 6)">
              <div @click="setRecipe(recipeItem)">
                <RecipeItem
                  class="pointer"
                  :key="index"
                  :recipe="recipeItem"
                ></RecipeItem>
              </div>
            </template>
          </div>
          <div v-else>
            <b-table striped show-empty></b-table>
          </div>
        </section>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import RecipeItem from "./RecipeItem.vue";
import { createNamespacedHelpers } from "vuex";
import _ from "lodash";

const { mapState } = createNamespacedHelpers("client");

export default {
  components: { RecipeItem },
  props: {
    recipe: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      fields: [{ key: "line", label: "Ingredients" }],
    };
  },
  computed: {
    ...mapState(["recipes"]),
    recipesData() {
      return _.cloneDeep(this.recipes);
    },
    recipeClone() {
      return _.cloneDeep(this.recipe);
    },
    content() {
      if (this.recipe.content) {
        const string = this.recipe.content.slice(1, -1);
        return JSON.parse("[" + string + "]");
      }
    },
  },
  methods: {
    setRecipe(payload) {
      this.recipe = payload;
    },
  },
};
</script>
<style lang="scss" scoped>
.card-body {
  padding: 0;
  .table-responsive {
    margin: 0;
  }
}
.pointer {
  cursor: pointer;
}
</style>
