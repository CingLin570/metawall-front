<template>
  <section class="vh-100 d-flex justify-content-center align-items-center">
    <div
      class="card px-lg-7 px-3 bg-secondary border-2 shadow-gray rounded-0"
      style="width: 56rem"
    >
      <div class="row py-lg-11">
        <div class="col-md-6 d-md-flex align-items-center justify-content-center d-none">
          <img src="~@/assets/img/banner.svg" alt="signin" class="img-fluid" draggable="false"/>
        </div>
        <div class="col-md-6">
          <h1 class="mb-3 text-center text-primary metawall-logo">MetaWall</h1>
          <p class="h4 mb-3 text-center">忘記密碼</p>
            <Form v-slot="{ errors }" class="needs-validation" v-if="!sendEmail"
            @submit="forgetPassword">
                <div class="form-group mb-3">
                  <Field
                    type="email"
                    class="form-control font-azeret"
                    :class="{ 'is-invalid': errors['email'] }"
                    id="userEmail"
                    name="email"
                    placeholder="Email"
                    required
                    v-model="info.email"
                    rules="email|required"
                    :disabled="sendEmail">
                  </Field>
                  <error-message name="email" class="invalid-feedback"></error-message>
                </div>
                <p v-if="errorMessage" class="text-danger text-center fs-7 mb-2 d-block">
                  {{ errorMessage }}
                </p>
                <div class="d-grid gap-2 mb-2">
                  <button
                    type="submit"
                    class="btn btn-primary shadow-black rounded-3">
                    送出
                  </button>
                </div>
            </Form>
            <Form v-slot="{ errors }" class="needs-validation" v-else
            @submit="verification">
                <div class="form-group mb-3">
                  <Field
                    type="email"
                    class="form-control font-azeret"
                    :class="{ 'is-invalid': errors['email'] }"
                    id="userEmail"
                    name="email"
                    placeholder="Email"
                    required
                    v-model="info.email"
                    rules="email|required"
                    :disabled="sendEmail">
                  </Field>
                  <error-message name="email" class="invalid-feedback"></error-message>
                </div>
                <div class="form-group mb-3" v-if="sendEmail">
                  <Field
                    type="text"
                    class="form-control font-azeret"
                    :class="{ 'is-invalid': errors['verification'] }"
                    id="verification"
                    name="verification"
                    placeholder="驗證碼"
                    required
                    v-model="info.verification"
                    rules="required|min:4|numeric">
                  </Field>
                  <error-message name="verification" class="invalid-feedback"></error-message>
                </div>
                <p v-if="errorMessage" class="text-danger text-center fs-7 mb-2 d-block">
                  {{ errorMessage }}
                </p>
                <div class="d-grid gap-2 mb-2">
                  <button
                    type="submit"
                    class="btn btn-primary shadow-black rounded-3">
                    送出
                  </button>
                </div>
            </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ForgetPassword',
  data () {
    return {
      sendEmail: false,
      errorMessage: '',
      info: {
        email: '',
        verification: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setInfo', 'setToken']),
    forgetPassword () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const data = {
          email: this.info.email
        }
        const config = {
          method: 'POST',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/sendMail`,
          data
        }
        this.$http(config).then((response) => {
          this.$store.dispatch('updateLoading', false)
          this.sendEmail = true
        }).catch((error) => {
          this.$store.dispatch('updateLoading', false)
          reject(error.response.data.message)
          this.errorMessage = error.response.data.message
        })
      })
    },
    verification () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('updateLoading', true)
        const config = {
          method: 'POST',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/verification`,
          data: this.info
        }
        this.$http(config).then((response) => {
          this.$store.dispatch('updateLoading', false)
          const data = response.data.user
          this.setToken(data.token)
          this.setInfo({
            name: data.name,
            photo: data.photo,
            _id: data._id
          })
          this.$router.push({ name: '首頁' })
        }).catch((error) => {
          this.$store.dispatch('updateLoading', false)
          reject(error.response.data.message)
          this.errorMessage = error.response.data.message
        })
      })
    }
  }
}
</script>

<style>
</style>
