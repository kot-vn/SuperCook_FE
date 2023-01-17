<template>
  <div class="ingredient-category-wrapper">
    <b-card
      v-for="ingredientCategory in ingredientCategories"
      :key="ingredientCategory.id"
      no-body
      class="mb-1"
    >
      <b-card-header
        v-b-toggle="'accordion' + ingredientCategory.id"
        header-tag="header"
        class="p-1"
        role="tab"
      >
        <div class="accordion-header-wrapper d-flex">
          <div class="left-section p-2">
            <img :src="ingredientCategory.icon" />
          </div>
          <div
            class="right-section p-2 d-flex justify-content-start align-items-center"
          >
            <div class="w-100">
              <span class="cate-title font-weight-bold">
                {{ ingredientCategory.categoryName }}
              </span>
              <br />
              <span class="cate-counter">
                {{ ingredientCategory.total }} Ingredients
              </span>
            </div>
          </div>
        </div>
      </b-card-header>
      <b-collapse :id="'accordion' + ingredientCategory.id" role="tabpanel">
        <b-card-body class="p-2">
          <div class="ingredient-list">
            <span
              v-for="ingredient in ingredientCategory.ingredientDtoList"
              :key="ingredient.id"
              class="ingredient-item d-inline-block rounded text-decoration-none"
              :class="{ active: isActive(ingredient.id) }"
              @click="setIngredient(ingredient)"
            >
              {{ ingredient.name }}
            </span>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import _ from "lodash";

export default {
  props: {
    ingredientCategories: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapFields("client", {
      ingredientSearchValue: "ingredientSearchValue",
    }),
  },
  methods: {
    isActive(id) {
      return this.ingredientSearchValue.find((x) =>
        x.id === id ? true : false
      );
    },
    setIngredient(payload) {
      this.isActive(payload.id)
        ? this.ingredientSearchValue.splice(
            this.ingredientSearchValue.findIndex(function (i) {
              return i.id === payload.id;
            }),
            1
          )
        : this.ingredientSearchValue.push(payload);
    },
  },
};
</script>
