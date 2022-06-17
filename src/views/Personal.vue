<template>
  <section class="container mt-7 mb-7 mb-md-0 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <div class="card mb-5 border-2 position-relative">
          <div class="d-flex align-items-center">
            <img
              class="image bg-secondary me-1 img-fluid"
              src="~@/assets/img/user.png"
              alt="user"
              v-if="!personal.photo"
            />
            <img
              class="image bg-secondary me-1 img-fluid"
              :src="personal.photo"
              alt="user"
              v-else
            />
            <div class="d-flex justify-content-between w-100">
              <div>
                <p class="mb-0 fw-bold">{{ personal.name }}</p>
                <small>{{ personal.followerLength }} 人追蹤</small>
              </div>
              <template v-if="!isSelf">
                <div>
                  <button
                    type="button"
                    class="btn btn-warning me-2 px-4 shadow-black"
                    v-if="!personal.checkFollow"
                    @click="addFollow"
                  >
                    追蹤
                  </button>
                  <button
                    type="button"
                    class="btn btn-gray-light me-2 px-4 shadow-black"
                    v-else
                    @click="removeFollow"
                  >
                    取消追蹤
                  </button>
                </div>
              </template>
            </div>
          </div>
          <div
            class="position-absolute rounded border border-dark border-2 w-100 py-6 bg-white"
            style="z-index: -1; top: 6px; left: -6px"
          ></div>
        </div>
        <SearchBar @search="getUserPosts"></SearchBar>
        <ul class="ps-0" v-if="posts?.length">
          <PostCard :post="post" v-for="post in posts"
            :key="post.name + post._id" @update="getUserPosts">
          </PostCard>
        </ul>
        <template v-else>
          <NoPostsCard :message="'此使用者目前尚無動態!'"></NoPostsCard>
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
import PostCard from '../components/PostCard/Index.vue'
import SearchBar from '../components/SearchBar.vue'
import NoPostsCard from '../components/NoPostsCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'personal',
  components: {
    Sidebar,
    SidebarSm,
    NoPostsCard,
    PostCard,
    SearchBar
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      userInfo: {},
      personal: {},
      posts: '',
      search: {}
    }
  },
  async created () {
    // 動態路由無法正確取得生命週期，使用watch監聽
    this.$watch(
      () => this.id,
      async (toParams, previousParams) => {
        this.userInfo = await this.checkPersonal(toParams)
        if (this.userInfo) {
          await this.getUserPosts()
        }
      }
    )
    await this.checkPersonal(this.id)
    await this.getUserPosts()
  },
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    }),
    isSelf () {
      return this.id === this.info._id
    }
  },
  methods: {
    async checkPersonal (id) {
      this.$store.dispatch('updateLoading', true)
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/v1/user/profile/${id}`,
        headers: {
          authorization: `Bearer ${this.token}`
        }
      }
      return await this.$http(config).then(res => {
        this.$store.dispatch('updateLoading', false)
        console.log(res.data.message)
        this.personal = res.data.message
        return true
      }).catch(() => {
        this.$store.dispatch('updateLoading', false)
        this.$router.push({ name: '個人貼文牆頁', params: { id: this.info._id } })
        return false
      })
    },
    getUserPosts (search = this.search) {
      return new Promise((resolve, reject) => {
        this.search = search
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/user/${this.id}`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.posts = res.data.message
            console.log(res.data.message)
            resolve(res.data.message)
            this.$store.dispatch('updateLoading', false)
          })
          .catch((error) => {
            reject(error.response.data.message)
            this.$store.dispatch('updateLoading', false)
          })
      })
    },
    addFollow () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'POST',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/${this.id}/follow`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then(async (res) => {
            resolve(res.data.message)
            await this.checkPersonal(this.id)
            await this.getUserPosts()
            this.$store.dispatch('updateLoading', false)
          })
          .catch(async (error) => {
            reject(error.response.data.message)
            await this.checkPersonal(this.id)
            await this.getUserPosts()
            this.$store.dispatch('updateLoading', false)
          })
      })
    },
    removeFollow () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'DELETE',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/${this.id}/follow`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then(async (res) => {
            resolve(res.data.message)
            await this.checkPersonal(this.id)
            await this.getUserPosts()
            this.$store.dispatch('updateLoading', false)
          })
          .catch(async (error) => {
            reject(error.response.data.message)
            await this.checkPersonal(this.id)
            await this.getUserPosts()
            this.$store.dispatch('updateLoading', false)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 80px;
  height: 80px;
}
</style>
