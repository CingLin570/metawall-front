<template>
<div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title text-white" id="staticBackdropLabel">編輯貼文</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-group mb-3">
          <label for="content">貼文內容</label>
          <textarea
            class="form-control"
            id="content"
            rows="5"
            placeholder="輸入您的貼文內容"
            v-model="tempPost.content"
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
          :src="tempPost.image"
          alt="photo1"
          class="w-100 img-fluid mb-2"
          v-show="tempPost.image"
        />
        <p
          v-if="errorMessage"
          class="text-danger text-center mb-2 fs-7 d-block"
        >
          {{ errorMessage }}
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-outline-dark"
        @click.prevent="submitPost()">確定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditPost',
  data () {
    return {
      errorMessage: '',
      tempPost: {}
    }
  },
  props: {
    editId: {
      type: [String, Number],
      require: true
    },
    editModal: {
      type: Object,
      default () { return {} }
    },
    post: {
      type: Object,
      default () { return {} }
    }
  },
  emits: ['edit-post'],
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  watch: {
    post () {
      this.tempPost = this.post
    }
  },
  methods: {
    // 預覽圖片
    getPreviewFile () {
      const input = this.$refs['upload-file']
      this.tempPost.image = URL.createObjectURL(input.files[0])
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
          url: `${process.env.VUE_APP_APIPATH}/api/v1/file`,
          headers: {
            authorization: `Bearer ${this.token}`
          },
          data: data
        }
        this.$http(config)
          .then((res) => {
            this.tempPost.image = res.data.message.link
            resolve(res.data.status)
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
            reject(this.errorMessage)
          })
      })
    },
    updatePost () {
      return new Promise((resolve, reject) => {
        const data = {
          content: this.tempPost.content,
          image: this.tempPost.image
        }
        const config = {
          method: 'PATCH',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${this.editId}`,
          headers: {
            authorization: `Bearer ${this.token}`
          },
          data
        }
        this.$http(config)
          .then((res) => {
            resolve(res.data.status)
          })
          .catch((error) => {
            reject(error.data)
          })
      })
    },
    async submitPost () {
      try {
        this.$store.dispatch('updateLoading', true)
        if (this.imagePreview) {
          // 先傳圖片
          await this.uploadFile()
        }
        await this.updatePost()
        this.$store.dispatch('updateLoading', false)
        this.$emit('edit-post')
        this.editModal.hide()
      } catch (error) {
        if (!this.errorMessage) {
          this.errorMessage = error
        }
        this.$emit('edit-post')
      }
    }
  }
}
</script>

<style>

</style>
