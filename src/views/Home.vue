<template>
  <Navigation></Navigation>
    <router-view/>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  name: 'Home',
  components: {
    Navigation
  }
}
</script>
