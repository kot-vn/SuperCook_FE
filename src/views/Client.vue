<template>
  <div>
    <SharedHeader></SharedHeader>
    <aside>
      <SharedSidebar></SharedSidebar>
    </aside>
    <main class="main">
      <div class="main-search-result pl-2 overflow-auto">
        <h2 class="py-4">You can make 30 recipes</h2>
        <div class="recipe-list">
          <div
            v-for="(item, index) in 30"
            :key="index"
            class="w-50 recipe-item px-2 d-inline-block"
          >
            <RecipeItem></RecipeItem>
          </div>
        </div>
      </div>
      <aside>
        <RecipeSidebar></RecipeSidebar>
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

const { mapActions } = createNamespacedHelpers("client");

export default {
  components: {
    RecipeItem,
    SharedHeader,
    SharedSidebar,
    RecipeSidebar,
  },
  data() {
    return {};
  },
  mounted() {
    this.fetchIngredientCategories();
    this.fetchIngredients();
  },
  methods: { ...mapActions(["fetchIngredientCategories", "fetchIngredients"]) },
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
