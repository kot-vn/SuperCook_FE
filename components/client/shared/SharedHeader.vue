<template>
  <header>
    <div class="header-wrapper p-4">
      <div class="brand-name pb-4">
        <h1 class="mx-auto">SuperCook</h1>
      </div>
      <div class="search-bar">
        <b-form-input
          v-model="searchValue"
          class="pl-5"
          type="search"
          placeholder="Find..."
        >
        </b-form-input>
        <span class="mdi mdi-magnify"></span>
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
