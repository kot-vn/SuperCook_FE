<template>
  <div class="loading-wrapper d-flex justify-content-center align-items-center">
    <div class="lds-ellipsis">
      <div v-for="i in 4"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/loader.scss";
</style>
