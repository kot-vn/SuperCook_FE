<template>
  <div class="ingredient-category-wrapper">
    <b-card v-for="(item, index) in 10" :key="index" no-body class="mb-1">
      <b-card-header
        v-b-toggle="'accordion' + index"
        header-tag="header"
        class="p-1"
        role="tab"
      >
        <div class="accordion-header-wrapper d-flex">
          <div class="left-section p-2">
            <img
              src="https://www.supercook.com/statics/sicons/All%20cuisines.png"
              alt=""
            />
          </div>
          <div
            class="right-section p-2 d-flex justify-content-start align-items-center"
          >
            <div class="w-100">
              <span class="cate-title font-weight-bold"
                >Vegetables & Greens</span
              >
              <br />
              <span class="cate-counter">100 Ingredients</span>
            </div>
          </div>
        </div>
      </b-card-header>
      <b-collapse :id="'accordion' + index" role="tabpanel">
        <b-card-body class="p-2">
          <div class="ingredient-list">
            <span
              v-for="(ingredient, ingredientIndex) in 10"
              :key="ingredientIndex"
              class="ingredient-item d-inline-block rounded text-decoration-none"
            >
              {{ ingredient + 'accordion' + index }}
            </span>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
