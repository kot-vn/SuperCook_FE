<template>
  <div>
    <SharedHeader></SharedHeader>
    <aside>
      <SharedSidebar></SharedSidebar>
    </aside>
    <main class="main">
      <div
        v-if="
          (recipes && recipes != [] && ingredientSearchValue.length != 0) ||
          (recipes && recipes != [] && searchValue != '')
        "
        class="main-search-result pl-2 overflow-auto"
      >
        <h2 class="py-4">You can make {{ pages.totalElements }} recipes</h2>
        <div class="recipe-list">
          <div
            v-for="(recipe, index) in recipes"
            :key="index"
            class="w-50 recipe-item px-2 d-inline-block"
          >
            <div @click="setRecipe(recipe)">
              <RecipeItem
                v-b-toggle.recipeSidebar
                :recipe="recipe"
              ></RecipeItem>
            </div>
          </div>
          <Pagy @fetchNewData="fetchData"></Pagy>
        </div>
      </div>
      <div v-else>
        <div class="empty-state-content mt-4">
          <img
            src="https://www.supercook.com/statics/images/empty-state-icon.png"
            alt=""
            class="empty-state-icon"
          />
          <h4 class="title">Add your ingredients to get started</h4>
          <h4>Every ingredient you add unlocks more recipes</h4>
        </div>
      </div>
      <aside>
        <RecipeSidebar :recipe="recipeData"></RecipeSidebar>
      </aside>
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import RecipeItem from "@/components/client/RecipeItem.vue";
import RecipeSidebar from "@/components/client/RecipeSidebar.vue";
import SharedHeader from "@/components/client/shared/SharedHeader.vue";
import SharedSidebar from "@/components/client/shared/SharedSidebar.vue";
import Pagy from "@/components/admin/shared/Pagy.vue";

const { mapActions, mapState } = createNamespacedHelpers("client");
const pagyMaper = createNamespacedHelpers("pagy");

export default {
  components: {
    RecipeItem,
    SharedHeader,
    SharedSidebar,
    RecipeSidebar,
    Pagy,
  },
  data() {
    return {
      recipeData: {},
    };
  },
  computed: {
    ...mapState(["recipes", "ingredientSearchValue", "searchValue"]),
    ...pagyMaper.mapState(["pages"]),
  },
  mounted() {
    this.RESET_PAGE();
    this.fetchIngredientCategories();
    this.fetchIngredients();
  },
  methods: {
    ...pagyMaper.mapMutations(["RESET_PAGE"]),
    ...mapActions([
      "fetchIngredientCategories",
      "fetchIngredients",
      "fetchRecipes",
      "fetchRecipesByName",
    ]),
    setRecipe(payload) {
      this.recipeData = payload;
    },
    fetchData() {
      if (this.searchValue != "") {
        this.fetchRecipesByName();
      } else {
        this.fetchRecipes();
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/client/client.scss";

main {
  margin-left: 0px;

  @media only screen and (min-width: 900px) {
    margin-left: 450px;
  }
}
</style>
