<template>
  <div>
    <SharedHeader></SharedHeader>
    <aside>
      <SharedSidebar></SharedSidebar>
    </aside>
    <main>
      <Nuxt />
      <aside>
        <RecipeSidebar></RecipeSidebar>
      </aside>
    </main>
  </div>
</template>
<script>
import RecipeSidebar from '~/components/client/RecipeSidebar.vue'
import SharedHeader from '~/components/client/shared/SharedHeader.vue'
import SharedSidebar from '~/components/client/shared/SharedSidebar.vue'
export default {
  components: { SharedHeader, SharedSidebar, RecipeSidebar },
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
  main {
    margin-left: 0px;
    @media only screen and (min-width: 900px) {
      margin-left: 450px;
    }
  }
  .b-sidebar {
    .b-sidebar-body {
      overflow: hidden !important;
    }
  }
}
</style>
