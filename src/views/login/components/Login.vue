<template>
  <div class="d-grid gap-2 mb-3">
    <button
      type="button"
      class="btn btn-outline-dark shadow-black rounded-3"
      @click="signInByGoogle">
      <img src="~@/assets/img/GoogleLogo.svg" alt="googleLogo"
      class="img img-fluid"> <span class="align-middle">使用 <span class="font-azeret">Google</span> 登入</span>
    </button>
  </div>
    <div class="d-grid gap-2 mb-3">
    <button
      type="button"
      class="btn btn-outline-dark shadow-black rounded-3"
      @click="signInByFacebook">
      <img src="~@/assets/img/FacebookLogo.png" alt="googleLogo"
      class="img img-fluid"> <span class="align-middle">使用 <span class="font-azeret">Facebook</span> 登入</span>
    </button>
  </div>
  <div class="d-flex align-items-center mb-3">
    <hr class="w-50">
    <span class="mx-2">或</span>
    <hr class="w-50">
  </div>
  <Form v-slot="{ errors }" @submit="signIn" class="needs-validation">
  <div class="form-group mb-3">
    <Field
      type="email"
      class="form-control font-azeret"
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
  <div class="form-group mb-3">
    <Field
      type="password"
      class="form-control font-azeret"
      :class="{ 'is-invalid': errors['password'] }"
      id="userPassword"
      placeholder="Password"
      name="password"
      required
      v-model="user.password"
      :rules="validatePassword">
    </Field>
    <error-message name="password" class="invalid-feedback"></error-message>
    <div class="d-flex">
      <router-link :to="{ name: '忘記密碼頁' }" class="ms-auto">
        忘記密碼?
      </router-link>
    </div>
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
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  emits: ['current-page'],
  computed: {
    formIsFinished () {
      return this.user.email && this.user.password
    }
  },
  created () {
    this.errorMessage = this.$route.params.error
  },
  methods: {
    ...mapMutations(['setInfo', 'setToken']),
    validatePassword (value) {
      // 當欄位為空值
      if (!value) {
        return '密碼為必填'
      }
      // 當欄位密碼需符合八碼以上並英數混合，至少各一個大小寫英文字母'
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      if (!regex.test(value)) {
        return '密碼需符合八碼以上並英數混合，至少各一個大小寫英文字母'
      }
      return true
    },
    signIn () {
      this.$store.commit('updateLoading', true)
      const config = {
        method: 'POST',
        url: `${process.env.VUE_APP_APIPATH}/api/v1/user/login`,
        data: this.user
      }
      this.$http(config).then((response) => {
        this.$store.commit('updateLoading', false)
        const data = response.data.user
        this.setToken(data.token)
        this.setInfo({
          name: data.name,
          photo: data.photo,
          _id: data._id
        })
        this.$router.push({ name: '首頁' })
      }).catch(error => {
        this.$store.commit('updateLoading', false)
        if (error.response) {
          this.errorMessage = error.response.data.message
        }
      })
    },
    signInByGoogle () {
      this.$store.commit('updateLoading', true)
      window.location.replace(`${process.env.VUE_APP_APIPATH}/auth/google`)
      this.$store.commit('updateLoading', false)
    },
    signInByFacebook () {
      this.$store.commit('updateLoading', true)
      window.location.replace(`${process.env.VUE_APP_APIPATH}/auth/facebook`)
      this.$store.commit('updateLoading', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 24px;
  height: 24px;
}
</style>
