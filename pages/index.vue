<template>
  <div class="main-search-result overflow-auto">
    <h2 class="py-4">You can make 30 recipes</h2>
    <div class="recipe-list">
      <div
        v-for="(item, index) in 30"
        :key="index"
        class="w-50 px-2 d-inline-block"
      >
        <RecipeItem></RecipeItem>
      </div>
    </div>
  </div>
</template>
<script>
import RecipeItem from '@/components/client/RecipeItem.vue'
export default {
  components: {
    RecipeItem,
  },
  layout: 'client',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
