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
      <div class="search-bar pl-2 position-relative">
        <b-form-input
          v-model="searchValue"
          class="pl-5"
          type="search"
          placeholder="Find..."
        >
        </b-form-input>
        <span class="fa-solid fa-magnifying-glass position-absolute"></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return { searchValue: null };
  },
  mounted() {},
  methods: {},
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
