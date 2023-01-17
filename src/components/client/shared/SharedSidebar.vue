<template>
  <b-sidebar
    id="sidebar"
    no-header
    :bg-variant="sidebarBG"
    :backdrop="showBackdrop"
    width="450px"
    :visible="visible"
  >
    <div class="sidebar-wrapper pl-4 py-4 pr-2">
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
          :options-limit="300"
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
    <div class="sidebar-body overflow-auto py-4 pl-4 pr-2">
      <IngredientCategory
        :ingredient-categories="ingredientCategories"
      ></IngredientCategory>
    </div>
  </b-sidebar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";
import IngredientCategory from "@/components/client/IngredientCategory.vue";
import Multiselect from "vue-multiselect";

const { mapState } = createNamespacedHelpers("client");

export default {
  data() {
    return {
      visible: true,
      showBackdrop: false,
      sidebarBG: "unset",
    };
  },
  components: {
    IngredientCategory,
    Multiselect,
  },
  computed: {
    ...mapFields("client", {
      ingredientSearchValue: "ingredientSearchValue",
    }),
    ...mapState(["ingredientCategories", "ingredients"]),
  },
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
