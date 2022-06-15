<template>
  <div id="app">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style lang="scss">
  @import '@/assets/scss/all.scss';
</style>
