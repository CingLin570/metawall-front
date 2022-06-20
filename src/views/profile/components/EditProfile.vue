<template>
  <div class="card-body bg-white px-10 py-5">
    <form class="needs-validation" novalidate>
      <img
        src="~@/assets/img/user.png"
        alt="user"
        class="img-fluid w-50 mx-auto mb-4 d-block rounded-circle"
        v-if="!photoPreview"
      />
      <img
        :src="photoPreview"
        alt="user"
        class="img-fluid w-50 mx-auto mb-4 d-block rounded-circle"
        v-else
      />
      <div class="input-group mb-3">
        <label class="btn btn-dark mx-auto">
          <input
            id="upload-file"
            ref="upload-file"
            style="display: none"
            type="file"
            class="is-valid"
            accept="image/png, image/jpeg, image/jpg"
            @change="getPreviewFile"
          />
          上傳大頭照
        </label>
      </div>
      <div class="mb-3">
        <label for="editName" class="form-label">暱稱</label>
        <input
          type="text"
          class="form-control"
          id="editName"
          v-model="user.name"
        />
      </div>
      <p class="mb-0">性別</p>
      <div class="d-flex mb-5">
        <div class="form-check me-4">
          <input
            class="form-check-input"
            type="radio"
            name="sex"
            id="male"
            value="male"
            v-model="user.sex"
          />
          <label class="form-check-label" for="male"> 男性 </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="sex"
            id="female"
            value="female"
            v-model="user.sex"
          />
          <label class="form-check-label" for="female"> 女性 </label>
        </div>
      </div>
      <div class="d-grid">
        <button
          type="button"
          class="btn btn-primary border border-dark border-2 mb-2 shadow-black"
          @click="submit()"
        >
          送出更新
        </button>
        <p
          v-if="errorMessage"
          class="text-danger text-center fs-7 d-block"
        >
        {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EditProfile',
  data () {
    return {
      user: {
        name: '',
        photo: '',
        sex: ''
      },
      photoPreview: '', // 預覽大頭貼
      isUpdatePhoto: false, // 是否更新大頭貼
      errorMessage: '',
      type: 'avatar'
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.token
    })
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    ...mapMutations(['setInfo']),
    getProfile () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/profile`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((response) => {
            this.$store.dispatch('updateLoading', false)
            this.setProfile(response.data.message)
            resolve(response.data.message)
          })
          .catch((error) => {
            this.$store.dispatch('updateLoading', false)
            reject(error.response.data.message)
          })
      })
    },
    setProfile (response) {
      const { name, photo, sex } = response
      this.user = { name, photo, sex }
      this.photoPreview = photo
    },
    getPreviewFile () { // 預覽圖片
      const input = this.$refs['upload-file']
      this.photoPreview = URL.createObjectURL(input.files[0])
      this.isUpdatePhoto = true
    },
    // 上傳 imgur
    uploadFile () {
      return new Promise((resolve, reject) => {
        const input = this.$refs['upload-file']
        const data = new FormData()
        data.append('image', input.files[0])
        // 加入api判別類別，判別一比一尺寸
        data.append('type', this.type)
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
            this.user.photo = res.data.message.link
            this.photoPreview = ''
            resolve(res.data.status)
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
            reject(error.response.data.message)
            this.photoPreview = ''
          })
      })
    },
    updateProfile () {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'PATCH',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/user/profile`,
          headers: {
            authorization: `Bearer ${this.token}`
          },
          data: this.user
        }
        this.$http(config)
          .then(response => {
            resolve(response.data.message)
          })
          .catch(error => {
            reject(error.response.data.message)
          })
      })
    },
    async submit () {
      try {
        this.$store.dispatch('updateLoading', true)
        if (this.isUpdatePhoto) {
          await this.uploadFile() // 先上傳圖片
        }
        const response = await this.updateProfile() // 更新個人資訊
        this.setProfile(response)
        this.setInfo({ // 更新 vuex
          name: response.name,
          photo: response.photo,
          _id: response._id
        })
        this.errorMessage = ''
        this.$store.dispatch('updateLoading', false)
      } catch (error) {
        if (!this.errorMessage) {
          this.errorMessage = error
        }
        this.$store.dispatch('updateLoading', false)
        this.getProfile()
      }
    }
  }
}
</script>

<style>
</style>
