<template>
  <div>
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
          <span class="mdi mdi-close"></span>
        </div>
        <div class="search-bar position-relative">
          <b-form-input
            v-model="ingredientSearchValue"
            class="pl-5"
            type="search"
            placeholder="Add/remove ingredients..."
          >
          </b-form-input>
          <span class="mdi mdi-magnify position-absolute"></span>
        </div>
      </div>
      <div class="sidebar-body overflow-auto p-4">
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
      if (screenWidth <= 900) {
        this.visible = false
        this.showBackdrop = true
        this.sidebarBG = 'white'
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
