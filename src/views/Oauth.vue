<template>
  <div></div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Oauth',
  created () {
    if (this.$route.query.error) {
      console.log(decodeURIComponent(this.$route.query.error))
      this.$router.push({ name: '登入頁面', replace: true })
    }
    this.checkPersonal()
  },
  methods: {
    ...mapMutations(['setInfo', 'setToken']),
    checkPersonal () {
      this.$store.dispatch('updateLoading', true)
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/v1/user/profile`,
        headers: {
          authorization: `Bearer ${this.$route.query.token}`
        }
      }
      this.$http(config).then((response) => {
        this.$store.dispatch('updateLoading', false)
        console.log(response.data.message)
        const data = response.data.message
        this.setToken(this.$route.query.token)
        this.setInfo({
          name: data.name,
          photo: data.photo,
          _id: data._id
        })
        this.$router.push({ name: '首頁', replace: true })
      }).catch(() => {
        this.$store.dispatch('updateLoading', false)
        this.$router.push({ name: '登入頁面', replace: true })
      })
    }
  }
}
</script>

<style>

</style>
