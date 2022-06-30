<template>
  <section class="container mt-7 mb-7 mb-md-0 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <div class="card mb-5 rounded-0 border-2 position-relative">
          <h2 class="text-center fw-bold py-3 mb-0 fs-5">追蹤名單</h2>
          <div
            class="position-absolute border border-dark border-2 w-100 py-4"
            style="z-index: -1; top: 10px; left: -6px"
          ></div>
        </div>
        <ul class="ps-0" v-if="followers?.length">
          <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black"
          v-for="(item, key) in followers" :key="item + key">
            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex align-items-center">
                <router-link :to="{ name: '個人貼文牆頁', params: { id: item.user._id } }">
                  <img
                    class="img me-3 img-fluid rounded-circle"
                    src="~@/assets/img/user.png"
                    alt="user2"
                    v-if="!item.user.photo"
                  />
                  <img
                    class="img me-3 img-fluid rounded-circle"
                    :src="item.user.photo"
                    alt="user2"
                    v-else
                  />
                </router-link>
                <div class="d-flex flex-column mt-2">
                  <router-link :to="{ name: '個人貼文牆頁', params: { id: item.user._id } }">
                    {{ item.user.name }}
                  </router-link>
                  <small class="text-muted">追蹤時間：{{ getDate(item.createdAt) }}</small>
                </div>
              </div>
              <div>
                <p class="mb-0 fs-8">您已追蹤 {{ getDuringDays(item.createdAt) }} 天！</p>
              </div>
            </div>
          </li>
        </ul>
        <template v-else>
          <NoPostsCard :message="'目前尚無追蹤用戶！'"></NoPostsCard>
        </template>
      </div>
      <Sidebar></Sidebar>
    </div>
    <div
      class="
        list-group
        border border-dark
        rounded-pill
        fixed-bottom
        bg-secondary
        d-md-none
        mx-1
      "
    ></div>
    <SidebarSm></SidebarSm>
  </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import SidebarSm from '../components/SidebarSm.vue'
import NoPostsCard from '../components/NoPostsCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'follower',
  components: {
    Sidebar,
    SidebarSm,
    NoPostsCard
  },
  data () {
    return {
      followers: []
    }
  },
  created () {
    this.getFollowing()
  },
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    })
  },
  methods: {
    getFollowing () {
      return new Promise((resolve, reject) => {
        this.$store.commit('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/following`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.followers = res.data.message.following
            resolve(res.data.message.following)
            this.$store.commit('updateLoading', false)
          })
          .catch((error) => {
            reject(error.response.data.message)
            this.$store.commit('updateLoading', false)
          })
      })
    },
    getDate (createdAt) {
      const date = new Date(createdAt).toLocaleDateString()
      const time = new Date(createdAt).toTimeString().split(' ')[0]
      return `${date} ${time}`
    },
    getDuringDays (createdAt) {
      const during = new Date().getTime() - new Date(createdAt).getTime()
      return parseInt(Math.abs(during) / 1000 / 60 / 60 / 24)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  height: 50px;
  width: 50px;
}
</style>
