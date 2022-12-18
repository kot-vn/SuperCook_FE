<template>
  <div>
    <SharedHeader></SharedHeader>
    <h1>Client layout</h1>
    <Nuxt />
  </div>
</template>

<script>
import SharedHeader from '~/components/client/shared/SharedHeader.vue'

export default {
  components: { SharedHeader },
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
}
</style>
