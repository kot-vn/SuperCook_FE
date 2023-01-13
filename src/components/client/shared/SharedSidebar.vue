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
        <multiselect
          v-model="ingredientSearchValue"
          :options="ingredients"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Add/remove ingredients..."
          label="name"
          track-by="name"
          :preselect-first="true"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
            >
              {{ values.length }} options selected
            </span>
          </template>
        </multiselect>
      </div>
    </div>
    <div class="sidebar-body overflow-auto p-4">
      <IngredientCategory
        :ingredient-categories="ingredientCategories"
      ></IngredientCategory>
    </div>
  </b-sidebar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import IngredientCategory from "@/components/client/IngredientCategory.vue";
import Multiselect from "vue-multiselect";

const { mapState } = createNamespacedHelpers("client");

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
    Multiselect,
  },
  computed: {
    ...mapState(["ingredientCategories", "ingredients"]),
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
