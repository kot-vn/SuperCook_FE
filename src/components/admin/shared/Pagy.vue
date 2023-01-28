<template>
  <center class="pagi-center" v-if="pages.page">
    <div class="pagination-wrapper" v-if="pages.pages > 1">
      <div v-if="pages.page > 1" @click="goToPrePage">&laquo;</div>
      <div v-if="pages.page == 4 || pages.page > 5" @click="changePageFunc(1)">
        <p>1</p>
      </div>
      <template v-for="pageIndex in 2">
        <div
          :key="pageIndex"
          v-if="pages.page == 5"
          :class="{ active: pages.page === pageIndex }"
          @click="changePageFunc(pageIndex)"
        >
          <p>{{ pageIndex }}</p>
        </div>
      </template>
      <div v-if="pages.page > 5">
        <p>...</p>
      </div>
      <template v-for="pageIndex in pages.pages">
        <div
          :key="pageIndex"
          v-if="pageIndex <= pages.page + 2 && pageIndex >= pages.page - 2"
          :class="{ active: pages.page === pageIndex }"
          @click="changePageFunc(pageIndex)"
        >
          <p>{{ pageIndex }}</p>
        </div>
      </template>
      <div v-if="pages.page <= pages.pages - 5">
        <p>...</p>
      </div>
      <div
        v-if="pages.page == pages.pages - 4"
        @click="changePageFunc(pages.pages)"
      >
        <p>{{ pages.pages - 1 }}</p>
      </div>
      <div
        v-if="pages.page <= pages.pages - 3 || pages.page < pages.pages - 4"
        @click="changePageFunc(pages.pages)"
      >
        <p>{{ pages.pages }}</p>
      </div>
      <div v-if="pages.page < pages.pages" @click="goToNextPageFunc">
        &raquo;
      </div>
    </div>
  </center>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const pagingStore = createNamespacedHelpers("pagy");
export default {
  computed: {
    ...pagingStore.mapState(["pages"]),
  },
  methods: {
    ...pagingStore.mapMutations(["PRE_PAGE", "NEXT_PAGE", "CHANGE_PAGE"]),
    goToPrePage() {
      this.PRE_PAGE();
      this.$emit("fetchNewDatas");
    },
    goToNextPageFunc() {
      this.NEXT_PAGE();
      this.$emit("fetchNewDatas");
    },
    changePageFunc(newPage) {
      this.CHANGE_PAGE(newPage);
      this.$emit("fetchNewDatas");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/admin/pagy.scss";
</style>
