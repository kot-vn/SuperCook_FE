<template>
  <div id="app">
    <router-view></router-view>
    <Loader v-if="showLoading"></Loader>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import Loader from "./components/shared/Loader.vue";
import { mapState } from "vuex";

export default {
  metaInfo() {
    return { title: "SuperCook - Zero Waste Recipe" };
  },
  computed: {
    ...mapState(["showLoading"]),
  },
  components: { Loader },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
@import "vue-multiselect/dist/vue-multiselect.min.css";
</style>
