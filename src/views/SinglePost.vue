<template>
  <section class="container mt-7 mb-7 mb-md-0 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div class="card mb-5 rounded-0 border-2 position-relative">
            <h2 class="text-center fw-bold py-3 mb-0 fs-5">查看單筆貼文</h2>
            <div
              class="position-absolute border border-dark border-2 w-100 py-4"
              style="z-index: -1; top: 10px; left: -6px"
            ></div>
          </div>
        </div>
        <template v-if="post?.length === 0">
          <NoPostsCard :message="'目前尚無動態!'"></NoPostsCard>
        </template>
        <template v-else>
          <ul class="ps-0">
            <PostCard :post="post" @update="getSinglePost(id)"></PostCard>
          </ul>
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
import PostCard from '../components/PostCard/Index.vue'
import { mapState } from 'vuex'

export default {
  name: 'wall',
  components: {
    Sidebar,
    SidebarSm,
    NoPostsCard,
    PostCard
  },
  data () {
    return {
      post: ''
    }
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    })
  },
  async created () {
    // 動態路由無法正確取得生命週期，使用watch監聽
    this.$watch(
      () => this.id,
      async (toParams, previousParams) => {
        await this.getSinglePost(toParams)
      }
    )
    this.getSinglePost(this.id)
  },
  methods: {
    getSinglePost (id) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${id}`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.post = res.data.message
            console.log(res.data.message)
            resolve(res.data.message)
            this.$store.dispatch('updateLoading', false)
          })
          .catch((error) => {
            reject(error.response.data.message)
            this.$router.push({ name: '首頁' })
            this.$store.dispatch('updateLoading', false)
          })
      })
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
