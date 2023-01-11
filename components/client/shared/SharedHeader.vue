<template>
  <header>
    <div class="header-wrapper p-4">
      <div class="brand-name position-relative pb-4">
        <div
          v-b-toggle.sidebar
          class="sidebar-toggle-btn text-white position-absolute"
        >
          <span class="mdi mdi-menu"></span>
        </div>
        <h1 class="mx-auto text-white">SuperCook</h1>
      </div>
      <div class="search-bar position-relative">
        <b-form-input
          v-model="searchValue"
          class="pl-5"
          type="search"
          placeholder="Find..."
        >
        </b-form-input>
        <span class="mdi mdi-magnify position-absolute"></span>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      searchValue: null,
    }
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
