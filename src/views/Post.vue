<template>
<Loading :active="isLoading"></Loading>
    <section class="container mt-7 px-lg-12">
      <div class="row">
        <div class="col-md-7">
          <div class="card mb-5 rounded-0 border-2 position-relative">
            <h2 class="text-center fw-bold py-3 mb-0 fs-5">張貼動態</h2>
            <div
              class="position-absolute border border-dark border-2 w-100 py-4"
              style="z-index: -1; top: 10px; left: -6px"
            ></div>
          </div>
          <div class="card border border-dark border-2 shadow-black p-5">
            <form class="needs-validation" novalidate>
              <div class="form-group mb-3">
                <label for="content">貼文內容</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="5"
                  placeholder="輸入您的貼文內容"
                  v-model="info.content"
                ></textarea>
              </div>
              <div class="input-group mb-2">
                <label class="btn btn-dark">
                  <input
                    id="upload_img"
                    style="display: none"
                    type="file"
                    class="is-valid"
                  />
                  上傳圖片
                </label>
              </div>
              <img
                src="~@/assets/img/photo1.png"
                alt="photo1"
                class="w-100 img-fluid mb-2"
              />
              <p class="text-danger text-center mb-2 fs-7 d-none">
                圖片檔案過大，僅限 1mb 以下檔案
                <br />
                圖片格式錯誤，僅限 JPG、PNG 圖片
              </p>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-gray-dark border border-dark border-2 fw-bold"
                  :disabled="!info.content"
                  @click.prevent="addPost()">
                  送出貼文
                </button>
              </div>
            </form>
          </div>
        </div>
  <Sidebar></Sidebar>
      </div>
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'post',
  components: {
    Sidebar
  },
  data () {
    return {
      info: {
        user: '627f45afcb9c03c97897f7bd',
        content: '',
        type: 'person',
        tags: ['你好'],
        image: '',
        likes: 0
      },
      isLoading: false
    }
  },
  methods: {
    addPost () {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        const config = {
          method: 'POST',
          url: 'https://secure-plains-31314.herokuapp.com/posts',
          data: this.info
        }
        this.$http(config).then((res) => {
          this.isLoading = false
          this.info.content = ''
          resolve(res.data.status)
        }).catch((error) => {
          this.isLoading = false
          this.info.content = ''
          reject(error.data)
        })
      })
    }
  }
}
</script>

<style>

</style>
