<template>
  <li
  class="card h-100 py-4 px-4 mb-3 border-2 shadow-black"
>
  <div class="d-flex align-items-center mb-3">
    <router-link :to="{ name: '個人貼文牆頁', params: { id: post.user._id } }">
      <img
        class="img me-3 img-fluid rounded-circle"
        :src="post.user.photo"
        alt="user1"
        v-if="post.user.photo !== ''"
      />
      <img
      class="img me-3 img-fluid rounded-circle"
      src="~@/assets/img/user.png"
      alt="user1"
      v-else
      />
    </router-link>
    <div class="d-flex flex-column mt-2">
      <router-link :to="{ name: '個人貼文牆頁', params: { id: post.user._id } }"
      class="mb-0 fw-bold">
        {{ post.user.name }}
      </router-link>
      <small class="text-muted">{{
        getDate(post.createdAt)
      }}</small>
    </div>
    <div class="dropdown ms-auto align-self-start" v-if="isAuth(post.user._id)">
      <button class="edit-btn border-0" type="button" id="edit-btn" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-three-dots"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="edit-btn">
        <li>
          <a class="dropdown-item text-center border-bottom" href="#"
          @click.prevent="checkEditPost(post._id, post)">
          <i class="bi bi-pencil-square me-2"></i>編輯貼文
          </a>
        </li>
        <li>
          <a class="dropdown-item text-center" href="#"
          @click.prevent="checkDeletePost(post._id)">
          <i class="bi bi-trash3 me-2"></i>刪除貼文
          </a>
        </li>
      </ul>
    </div>
  </div>
  <p>{{ post.content }}</p>
  <img
    :src="post.image"
    alt="photo1"
    class="img-fluid"
    v-if="post.image"
  />
  <div class="d-flex align-items-center mt-3">
    <button type="button" class="btn p-0 shadow-none" v-if="post.likes.includes(info._id)"
    @click="removeLike">
      <i class="bi bi-hand-thumbs-up-fill fs-5 me-2 text-primary"></i>
    </button>
    <button type="button" class="btn p-0 shadow-none" v-else @click="addLike">
      <i class="bi bi-hand-thumbs-up fs-5 me-2 text-primary"></i>
    </button>
    <p class="my-2 fs-5 text-primary">{{ post.likes.length }}</p>
    <p class="text-muted my-2 ms-2 fs-7" v-if="post?.likes?.length === 0">成為第一個按讚的朋友</p>
  </div>
  <div class="d-flex mt-3">
    <img
      class="img me-3 img-fluid rounded-circle"
      :src="info.photo"
      alt="user1"
      v-if="info.photo"
    />
    <img
      src="~@/assets/img/user.png"
      alt="usr1"
      class="img img-fluid me-1 rounded-circle"
      v-else
    />
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="留言..."
        aria-label="message"
        aria-describedby="button-message"
        v-model="content"
        @keyup.enter="sendComment()"
      />
      <button
        class="btn btn-primary px-4 rounded-0 border-dark"
        type="button"
        id="button-message"
        @click="sendComment()"
      >
        留言
      </button>
    </div>
    <!-- 留言 -->
  </div>
    <ul class="p-0">
      <li
        class="card h-100 py-4 px-4 border-0 rounded-0 mt-3 bg-gray-light"
        v-for="(comment, key) in post.comments" :key="comment + key">
        <div class="d-flex align-items-center mb-3">
          <router-link :to="{ name: '個人貼文牆頁', params: { id: comment.user._id } }">
          <img
            class="img me-3 img-fluid"
            :src="comment.user.photo"
            alt="user"
            v-if="comment.user.photo"
          />
          <img
            class="img me-3 img-fluid"
            src="~@/assets/img/user.png"
            alt="user"
            v-else
          />
          </router-link>
          <div class="d-flex flex-column mt-2">
            <router-link :to="{ name: '個人貼文牆頁', params: { id: comment.user._id } }"
            class="mb-0 fw-bold">
              {{ comment.user.name }}
            </router-link>
            <small class="text-muted">{{ getDate(comment.createdAt) }}</small>
          </div>
        </div>
        <p>{{ comment.comment }}</p>
      </li>
    </ul>
</li>
<DeletePost ref="deleteModal" :delete-modal="deleteModal" :delete-id="deleteId"
@delete="deletePost"></DeletePost>
<EditPost ref="editModal" :edit-modal="editModal" :edit-id="editId"
@edit-post="editPost" :post="tempPost"></EditPost>
</template>

<script>
import DeletePost from './components/DeletePost.vue'
import EditPost from './components/EditPost.vue'
import { Modal } from 'bootstrap'
import { mapState } from 'vuex'

export default {
  name: 'PostCard',
  components: {
    DeletePost,
    EditPost
  },
  data () {
    return {
      content: '',
      editId: '',
      editModal: {},
      deleteModal: {},
      deleteId: '',
      tempPost: {}
    }
  },
  props: {
    post: {
      type: Object,
      require: true
    }
  },
  emits: ['update'],
  computed: {
    ...mapState({
      token: state => state.token,
      info: state => state.info
    })
  },
  mounted () {
    this.deleteModal = new Modal(this.$refs.deleteModal.$el)
    this.editModal = new Modal(this.$refs.editModal.$el)
  },
  methods: {
    isAuth (id) { // 是否有編輯權限
      return id === this.info._id
    },
    checkEditPost (postId, post) { // 編輯貼文
      this.editId = postId
      this.tempPost = { ...post }
      this.editModal.show()
    },
    checkDeletePost (postId) { // 刪除貼文
      this.deleteId = postId
      this.deleteModal.show()
    },
    getDate (createdAt) {
      const date = new Date(createdAt).toLocaleDateString()
      const time = new Date(createdAt).toTimeString().split(' ')[0]
      return `${date} ${time}`
    },
    addLike () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'POST',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${this.post._id}/likes`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.$store.dispatch('updateLoading', false)
            resolve(res.data.message)
            this.$emit('update')
          })
          .catch((error) => {
            this.$store.dispatch('updateLoading', false)
            reject(error.response.data.message)
            this.$emit('update')
          })
      })
    },
    removeLike () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'DELETE',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${this.post._id}/likes`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.$store.dispatch('updateLoading', false)
            resolve(res.data.message)
            this.$emit('update')
          })
          .catch((error) => {
            this.$store.dispatch('updateLoading', false)
            reject(error.response.data.message)
            this.$emit('update')
          })
      })
    },
    sendComment () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        if (!this.content) {
          return false
        }
        const config = {
          method: 'POST',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${this.post._id}/comment`,
          headers: {
            authorization: `Bearer ${this.token}`
          },
          data: {
            comment: this.content
          }
        }
        this.$http(config)
          .then((res) => {
            this.$store.dispatch('updateLoading', false)
            this.content = ''
            resolve(res.data.message)
            this.$emit('update')
          })
          .catch((error) => {
            this.$store.dispatch('updateLoading', false)
            reject(error.response.data.message)
            this.content = ''
            this.$emit('update')
          })
      })
    },
    deletePost () {
      this.$emit('update')
      this.deleteId = ''
    },
    editPost () {
      this.$emit('update')
      this.editId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-btn {
  background-color: transparent;
}
</style>
