<template>
  <div>
    <aside>
      <Sidebar></Sidebar>
    </aside>
    <section class="admin-main p-4">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Sidebar from "./shared/Sidebar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Sidebar,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
