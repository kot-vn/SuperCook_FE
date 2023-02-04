<template>
  <div v-if="recipe" class="shadow">
    <b-card
      :img-src="recipe.image"
      img-height="100px"
      img-width="150px"
      img-left
      class="mb-3"
    >
      <b-card-text> {{ recipe.title }} </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
