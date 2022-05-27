<template>
  <Loading :active="isLoading"></Loading>
  <Form v-slot="{ errors }" @submit="signIn" class="needs-validation">
  <div class="form-group mb-2">
    <label for="userEmail"></label>
    <Field
      type="email"
      class="form-control"
      :class="{ 'is-invalid': errors['email'] }"
      id="userEmail"
      aria-describedby="emailHelp"
      name="email"
      placeholder="Email"
      required
      v-model="user.email"
      rules="email|required">
    </Field>
    <error-message name="email" class="invalid-feedback"></error-message>
  </div>
  <div class="form-group mb-5">
    <label for="userPassword"></label>
    <Field
      type="password"
      class="form-control"
      :class="{ 'is-invalid': errors['password'] }"
      id="userPassword"
      placeholder="Password"
      name="password"
      required
      v-model="user.password"
      rules="required|min:8">
    </Field>
    <error-message name="password" class="invalid-feedback"></error-message>
  </div>
  <p v-if="errorMessage" class="text-danger text-center fs-7 mb-2 d-block">
    {{ errorMessage }}
  </p>
  <div class="d-grid gap-2 mb-2">
    <button
      type="submit"
      class="btn btn-primary shadow-black rounded-3"
      :disabled="!formIsFinished">
      登入
    </button>
  </div>
</Form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  emits: ['currentPage'],
  data () {
    return {
      user: {
        email: '',
        pasword: ''
      },
      errorMessage: '',
      isLoading: false
    }
  },
  computed: {
    formIsFinished () {
      return this.user.email && this.user.password
    }
  },
  methods: {
    ...mapMutations(['setInfo', 'setToken']),
    signIn () {
      this.isLoading = true
      const config = {
        method: 'POST',
        url: `${process.env.VUE_APP_APIPATH}/user/login`,
        data: this.user
      }
      this.$http(config).then((response) => {
        this.isLoading = false
        const data = response.data.user
        this.setToken(data.token)
        this.setInfo({
          name: data.name,
          photo: data.photo
        })
        this.$router.push({ name: '首頁' })
      }).catch(error => {
        this.isLoading = false
        if (error.response) {
          this.errorMessage = error.response.data.message
        }
      })
    }
  }
}
</script>

<style>
</style>
