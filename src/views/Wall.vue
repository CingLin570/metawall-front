<template>
  <section class="container mt-7 mb-7 mb-md-0 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <SearchBar @search="getPosts"></SearchBar>
        <template v-if="posts?.length === 0">
          <NoPostsCard :message="'目前尚無動態!'"></NoPostsCard>
        </template>
        <template v-else>
          <ul class="ps-0">
            <PostCard :post="post" v-for="post in posts"
            :key="post.name + post._id" @update="getPosts"></PostCard>
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
import SearchBar from '../components/SearchBar.vue'
import PostCard from '../components/PostCard/Index.vue'
import { mapState } from 'vuex'
const ws = new WebSocket('wss://still-fortress-89062.herokuapp.com/websockets')

export default {
  name: 'wall',
  components: {
    Sidebar,
    SidebarSm,
    NoPostsCard,
    PostCard,
    SearchBar
  },
  data () {
    return {
      posts: '',
      search: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    })
  },
  methods: {
    getPosts (search = this.search) {
      return new Promise((resolve, reject) => {
        this.search = search
        this.$store.commit('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/posts`,
          headers: {
            authorization: `Bearer ${this.token}`
          },
          params: this.search
        }
        this.$http(config)
          .then((res) => {
            this.posts = res.data.message
            resolve(res.data.message)
            this.$store.commit('updateLoading', false)
          })
          .catch((error) => {
            reject(error.response.data.message)
            this.$store.commit('updateLoading', false)
          })
      })
    }
  },
  created () {
    ws.onopen = () => console.log('WebSocket 服務已連接')
    ws.onclose = () => console.log('WebSocket 伺服器關閉')
    ws.onmessage = (message) => {
      if (typeof message.data === 'object') {
        this.getPosts()
      }
    }
    this.getPosts()
  }
}
</script>

<style>
.img {
  height: 50px;
  width: 50px;
}
</style>
