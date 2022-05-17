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
                    accept="image/png, image/jpeg, image/jpg"
                    ref="upload-file"
                    @change="getPreviewFile"
                  />
                  上傳圖片
                </label>
              </div>
              <img
                :src="imagePreview"
                alt="photo1"
                class="w-100 img-fluid mb-2"
                v-show="imagePreview"
              />
              <p v-if="errorMessage" class="text-danger text-center mb-2 fs-7 d-block">
                {{ errorMessage }}
              </p>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-gray-dark border border-dark border-2 fw-bold"
                  :disabled="!info.content"
                  @click.prevent="submitPost()">
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
const ws = new WebSocket('wss://secure-plains-31314.herokuapp.com/websockets')

export default {
  name: 'post',
  components: {
    Sidebar
  },
  data () {
    return {
      info: {
        user: '628088ed99e46ea03ea2be80',
        content: '',
        type: 'person',
        tags: ['你好'],
        image: '',
        likes: 0
      },
      isLoading: false,
      imagePreview: '',
      errorMessage: ''
    }
  },
  methods: {
    // 預覽圖片
    getPreviewFile () {
      const input = this.$refs['upload-file']
      this.imagePreview = URL.createObjectURL(input.files[0])
    },
    // 上傳 imgur
    uploadFile () {
      return new Promise((resolve, reject) => {
        const input = this.$refs['upload-file']
        const data = new FormData()
        data.append('image', input.files[0])
        // 清空 input，避免重複選同一檔案無法觸發 change 事件
        input.files = new DataTransfer().files

        const config = {
          method: 'POST',
          url: 'https://secure-plains-31314.herokuapp.com/files',
          data: data
        }
        this.$http(config).then((res) => {
          this.info.image = res.data.message.link
          this.imagePreview = ''
          resolve()
        }).catch((error) => {
          reject(error.data)
          this.imagePreview = ''
        })
      })
    },
    uploadPost () {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'POST',
          url: 'https://secure-plains-31314.herokuapp.com/posts',
          data: this.info
        }
        this.$http(config).then((res) => {
          this.info.content = ''
          resolve(res.data.status)
        }).catch((error) => {
          this.info.content = ''
          reject(error.data)
        })
      })
    },
    async submitPost () {
      try {
        this.isLoading = true
        if (this.imagePreview) {
          // 先傳圖片
          await this.uploadFile()
        }
        const response = await this.uploadPost()
        await ws.send(JSON.stringify(response))
        this.isLoading = false
      } catch (error) {
        this.errorMessage = error
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>
