<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  metaInfo() {
    return { title: "SuperCook - Zero Waste Recipe" };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
@import "vue-multiselect/dist/vue-multiselect.min.css";
</style>
