<template>
  <header>
    <div class="header-wrapper p-4">
      <div class="brand-name position-relative pb-4">
        <div
          v-b-toggle.sidebar
          class="sidebar-toggle-btn text-white position-absolute"
        >
          <i class="fa-solid fa-bars"></i>
        </div>
        <h1 class="mx-auto text-white">SuperCook</h1>
      </div>
      <div class="search-bar position-relative">
        <b-form-input
          v-model="searchValue"
          class="pl-5"
          type="text"
          placeholder="Find..."
          @input="searchRecipes"
        >
        </b-form-input>
        <span class="fa-solid fa-magnifying-glass position-absolute"></span>
      </div>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";

const { mapActions } = createNamespacedHelpers("client");
const pagyMaper = createNamespacedHelpers("pagy");

export default {
  computed: {
    ...mapFields("client", {
      searchValue: "searchValue",
      ingredientSearchValue: "ingredientSearchValue",
    }),
  },
  mounted() {
    this.RESET_PAGE();
  },
  methods: {
    ...mapActions(["fetchRecipesByName"]),
    ...pagyMaper.mapMutations(["RESET_PAGE"]),
    async searchRecipes() {
      await this.RESET_PAGE();
      this.ingredientSearchValue = [];
      this.fetchRecipesByName();
    },
  },
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 900px) {
  .header-wrapper {
    padding-left: 450px !important;
    .brand-name {
      .sidebar-toggle-btn {
        display: none;
      }
    }
  }
}
</style>
