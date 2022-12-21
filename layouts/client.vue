<template>
  <div>
    <SharedHeader></SharedHeader>
    <aside>
      <SharedSidebar></SharedSidebar>
    </aside>
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<script>
import SharedHeader from '~/components/client/shared/SharedHeader.vue'
import SharedSidebar from '~/components/client/shared/SharedSidebar.vue'
export default {
  components: { SharedHeader, SharedSidebar },
  data() {
    return {
      title: 'SuperCook - Zero Waste Recipe',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
::v-deep {
  @import '@/assets/styles/client/client.scss';
  .b-sidebar {
    .b-sidebar-body {
      overflow: hidden !important;
    }
  }
}
</style>
