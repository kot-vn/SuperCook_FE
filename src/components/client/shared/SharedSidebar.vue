<template>
  <b-sidebar
    id="sidebar"
    no-header
    :bg-variant="sidebarBG"
    :backdrop="showBackdrop"
    width="450px"
    :visible="visible"
  >
    <div class="sidebar-wrapper p-4">
      <div class="brand-name pb-4">
        <h1 class="mx-auto text-white">Pantry</h1>
      </div>
      <div
        v-if="showBackdrop"
        v-b-toggle.sidebar
        class="close-sidebar-btn text-white position-absolute"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="search-bar position-relative">
        <b-form-input
          v-model="ingredientSearchValue"
          class="pl-5"
          type="search"
          placeholder="Add/remove ingredients..."
        >
        </b-form-input>
        <span class="fa-solid fa-magnifying-glass position-absolute"></span>
      </div>
    </div>
    <div class="sidebar-body overflow-auto p-4">
      <IngredientCategory
        :ingredient-categories="ingredientCategories.data"
      ></IngredientCategory>
    </div>
  </b-sidebar>
</template>

<script>
import IngredientCategory from "@/components/client/IngredientCategory.vue";

export default {
  data() {
    return {
      visible: true,
      showBackdrop: false,
      ingredientSearchValue: null,
      sidebarBG: "unset",
    };
  },
  components: {
    IngredientCategory,
  },
  mounted() {},
  created() {
    this.showSidebar();
  },
  methods: {
    showSidebar() {
      const screenWidth = screen.width;
      if (screenWidth <= 900) {
        this.visible = false;
        this.showBackdrop = true;
        this.sidebarBG = "white";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
