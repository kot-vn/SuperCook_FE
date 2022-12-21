<template>
  <div>
    <b-sidebar
      id="sidebar"
      no-header
      :bg-variant="sidebarBG"
      :backdrop="showBackdrop"
      :visible="visible"
    >
      <div class="sidebar-wrapper p-4">
        <div class="brand-name pb-4">
          <h1 class="mx-auto">Pantry</h1>
        </div>
        <div v-if="showBackdrop" v-b-toggle.sidebar class="close-sidebar-btn">
          <span class="mdi mdi-close"></span>
        </div>
        <div class="search-bar">
          <b-form-input
            v-model="ingredientSearchValue"
            class="pl-5"
            type="search"
            placeholder="Add/remove ingredients..."
          >
          </b-form-input>
          <span class="mdi mdi-magnify"></span>
        </div>
      </div>
      <div class="sidebar-body p-4">
        <IngredientCategory></IngredientCategory>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
import IngredientCategory from '../IngredientCategory.vue'

export default {
  components: { IngredientCategory },
  data() {
    return {
      visible: true,
      showBackdrop: false,
      ingredientSearchValue: null,
      sidebarBG: 'unset',
    }
  },
  created() {
    this.showSidebar()
  },
  mounted() {},
  methods: {
    showSidebar() {
      const screenWidth = screen.width
      if (screenWidth <= 700) {
        this.visible = false
        this.showBackdrop = true
        this.sidebarBG = 'white'
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
