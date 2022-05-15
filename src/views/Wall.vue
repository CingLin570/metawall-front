<template>
    <Loading :active="isLoading"></Loading>
      <section class="container mt-7 px-lg-12">
      <div class="row">
        <div class="col-md-7">
          <div class="row">
            <div class="col-md-4 pe-1 mb-md-2 mb-3">
              <select id="newPost" class="form-select py-2" v-model="search.timeSort"
              @change="getPosts()">
                <option selected value="desc">最新貼文</option>
                <option value="asc">最舊貼文</option>
              </select>
            </div>
            <div class="col-md-8">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="搜尋貼文"
                  aria-label="search"
                  aria-describedby="button-search"
                  v-model="search.q"
                  @keyup.enter="getPosts()"
                />
                <button
                  class="btn btn-primary fs-5 rounded-0 px-3 border-dark"
                  type="button"
                  id="button-search"
                  @click="getPosts()"
                >
                  <!-- <span class="material-icons-outlined"> search </span> -->
                  <i class="bi bi-search fs-5"></i>
                </button>
              </div>
            </div>
          </div>
          <template v-if="posts.length === 0">
                      <div class="card border-2 shadow-black">
            <div class="card-header bg-white">
              <div class="d-flex">
                <div
                  class="p-1 bg-danger border border-light rounded-circle me-1"
                ></div>
                <div
                  class="p-1 bg-success border border-light rounded-circle me-1"
                ></div>
                <div
                  class="p-1 rounded-circle border border-light rounded-circle bg-warning"
                ></div>
              </div>
            </div>
            <div class="card-body py-5">
              <p class="card-text text-muted text-center">
                目前尚無動態，新增一則貼文吧！
              </p>
            </div>
          </div>
          </template>
          <template v-else>
            <ul class="ps-0">
            <li class="card h-100 py-4 px-4 mb-3 border-2 shadow-black"
            v-for="post in posts" :key="'post.name' + post._id">
              <div class="d-flex align-items-center mb-3">
                <img class="me-3 img-fluid" src="~@/assets/img/user1.png" alt="user1"
                v-if="post.user.photo !== ''"/>
                <div class="d-flex flex-column mt-2">
                  <a href="#" class="mb-0 fw-bold">{{ post.user.name }}</a>
                  <small class="text-muted">{{ getDate (post.createdAt) }}</small>
                </div>
              </div>
              <p>{{ post.content }}</p>
              <img :src="post.image" alt="photo1" class="img-fluid"
              v-if="post.image" />
              <div class="d-flex mt-3">
                <button type="button" class="btn p-0">
                  <i class="bi bi-hand-thumbs-up fs-5 me-2 text-primary"></i>
                </button>
                <p class="my-2 fs-5 text-primary">{{ post.likes }}</p>
              </div>
              <div class="d-flex mt-3">
                <img src="~@/assets/img/user1.png" alt="usr1" class="img-fluid me-1" />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="留言..."
                    aria-label="message"
                    aria-describedby="button-message"
                  />
                  <button
                    class="btn btn-primary px-4 rounded-0 border-dark"
                    type="button"
                    id="button-message"
                  >
                    留言
                  </button>
                </div>
              </div>
            </li>
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

const ws = new WebSocket('wss://secure-plains-31314.herokuapp.com/websockets')

export default {
  name: 'wall',
  components: {
    Sidebar,
    SidebarSm
  },
  data () {
    return {
      posts: [],
      search: {
        timeSort: 'desc',
        q: ''
      },
      isLoading: false
    }
  },
  methods: {
    getPosts () {
      this.isLoading = true
      const config = {
        method: 'GET',
        url: 'https://secure-plains-31314.herokuapp.com/posts',
        params: this.search
      }
      this.$http(config).then((res) => {
        if (res.data.status === 'success') {
          this.isLoading = false
          this.posts = res.data.message
          console.log(res.data)
        } else {
          console.log(res.data.status)
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    getDate (createdAt) {
      const date = new Date(createdAt).toLocaleDateString()
      const time = new Date(createdAt).toTimeString().split(' ')[0]
      return `${date} ${time}`
    }
  },
  created () {
    ws.onopen = () => console.log('WebSocket 服務已連接')
    ws.onclose = () => console.log('WebSocket 伺服器關閉')
    ws.onmessage = message => {
      if (typeof message.data === 'object') {
        this.getPosts()
      }
    }
    this.getPosts()
  }
}
</script>

<style>

</style>
