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
      visible
    >
      <div class="recipe-detail">
        <section class="recipe-detail-header w-100 position-relative">
          <div
            v-b-toggle.recipeSidebar
            class="close-sidebar-btn font-weight-bold position-absolute bg-white d-flex justify-content-center align-items-center rounded-circle"
          >
            <span class="mdi mdi-close"></span>
          </div>
          <img
            class="w-100 h-100"
            src="https://i2.supercook.com/8/1/d/1/81d1b3d9387a8747c12138ca08193f2c-0.jpg"
            alt=""
          />
        </section>
        <section class="recipe-detail-body px-4 w-100">
          <div
            class="shadow p-3 bg-white overflow-hidden font-weight-bold rounded position-relative recipe-title"
          >
            Instant Pot Perfect Hard Boiled Eggs
          </div>
          <div class="recipe-ingredients">
            <p class="font-weight-bold">Ingredients</p>
            <div>
              <b-table
                responsive
                borderless
                show-empty
                striped
                hover
                :items="ingredient"
              ></b-table>
            </div>
          </div>
        </section>
        <section class="more-recipe px-4 w-100">
          <p class="font-weight-bold">You might also like</p>
          <RecipeItem
            v-for="(recipeItem, index) in 10"
            :key="index"
          ></RecipeItem>
        </section>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import RecipeItem from './RecipeItem.vue'

export default {
  components: { RecipeItem },
  data() {
    return {
      ingredient: [
        { id: 1, name: '5 large onions' },
        { id: 2, name: '3 tablespoons olive oil or melted butter' },
        { id: 3, name: '1/2 teaspoon salt' },
      ],
    }
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
