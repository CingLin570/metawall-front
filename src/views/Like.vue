<template>
  <section class="container mt-7 mb-7 mb-md-0 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <div class="card mb-5 rounded-0 border-2 position-relative">
          <h2 class="text-center fw-bold py-3 mb-0 fs-5 fw-bold">我按讚的貼文</h2>
          <div
            class="position-absolute border border-dark border-2 w-100 py-4"
            style="z-index: -1; top: 10px; left: -6px"
          ></div>
        </div>
        <ul class="ps-0" v-if="likeList?.length">
          <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black"
          v-for="(item, key) in likeList" :key="item + key">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
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
                <div class="d-flex flex-column mt-2">
                  <a href="#" class="mb-0 fw-bold">{{ item.user.name }}</a>
                  <small class="text-muted">發文時間：{{ getDate(item.createdAt) }}</small>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <button type="button" class="btn d-flex flex-column" @click="removeLike(item._id)">
                  <i
                    class="bi bi-hand-thumbs-up fs-4 text-primary mb-1 mx-auto"
                  ></i>
                  <span class="fs-6 fw-bold">取消</span>
                </button>
                <router-link :to="{ name: '單筆貼文頁', params: { id: item._id } }"
                class="btn d-flex flex-column">
                  <i
                    class="bi bi-arrow-right-circle fs-4 fw-bold mb-1 mx-auto"
                  ></i>
                  <span class="fs-6 fw-bold">查看</span>
                </router-link>
              </div>
            </div>
          </li>
        </ul>
        <template v-else>
          <NoPostsCard :message="'目前尚無按讚貼文！'"></NoPostsCard>
        </template>
      </div>
      <Sidebar></Sidebar>
    </div>
    <SidebarSm></SidebarSm>
  </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import SidebarSm from '../components/SidebarSm.vue'
import NoPostsCard from '../components/NoPostsCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'like',
  components: {
    Sidebar,
    SidebarSm,
    NoPostsCard
  },
  data () {
    return {
      likeList: []
    }
  },
  created () {
    this.getLikeList()
  },
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    })
  },
  methods: {
    getLikeList () {
      return new Promise((resolve, reject) => {
        this.$store.commit('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/getLikeList`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.likeList = res.data.message
            resolve(res.data.message)
            this.$store.commit('updateLoading', false)
          })
          .catch((error) => {
            reject(error.response.data.message)
            this.$store.commit('updateLoading', false)
          })
      })
    },
    removeLike (id) {
      return new Promise((resolve, reject) => {
        this.$store.commit('updateLoading', true)
        const config = {
          method: 'DELETE',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${id}/likes`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.$store.commit('updateLoading', false)
            resolve(res.data.message)
            this.getLikeList()
          })
          .catch((error) => {
            this.$store.commit('updateLoading', false)
            reject(error.response.data.message)
            this.getLikeList()
          })
      })
    },
    getDate (createdAt) {
      const date = new Date(createdAt).toLocaleDateString()
      const time = new Date(createdAt).toTimeString().split(' ')[0]
      return `${date} ${time}`
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
