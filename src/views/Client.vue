<template>
  <div>
    <SharedHeader></SharedHeader>
    <aside>
      <SharedSidebar></SharedSidebar>
    </aside>
    <main class="main">
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
      <aside></aside>
    </main>
  </div>
</template>

<script>
import RecipeItem from "@/components/client/RecipeItem.vue";
import SharedHeader from "@/components/client/shared/SharedHeader.vue";
import SharedSidebar from "@/components/client/shared/SharedSidebar.vue";

export default {
  components: {
    RecipeItem,
    SharedHeader,
    SharedSidebar,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
