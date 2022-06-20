<template>
  <Form v-slot="{ errors }" class="needs-validation" @submit="submitSignup">
    <div class="form-group mb-3">
      <Field
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['name'] }"
        id="userName"
        name="name"
        placeholder="暱稱"
        required
        rules="required|min:2"
        v-model="user.name">
      </Field>
      <error-message name="name" class="invalid-feedback"></error-message>
    </div>
    <div class="form-group mb-3">
      <Field
        type="email"
        class="form-control font-azeret"
        :class="{ 'is-invalid': errors['email'] }"
        id="userEmail"
        name="email"
        aria-describedby="emailHelp"
        placeholder="Email"
        required
        rules="email|required"
        v-model="user.email">
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
        :rules="validatePassword"
        v-model="user.password">
        </Field>
        <error-message name="password" class="invalid-feedback"></error-message>
    </div>
    <div class="form-group mb-3">
      <Field
        type="password"
        class="form-control font-azeret"
        :class="{ 'is-invalid': errors['confirmPassword'] }"
        id="confirmPassword"
        placeholder="confirmPassword"
        name="confirmPassword"
        required
        rules="required|confirmed:@password"
        v-model="user.confirmPassword">
        </Field>
        <error-message name="confirmPassword" class="invalid-feedback"></error-message>
    </div>
    <p v-if="errorMessage" class="text-danger text-center fs-7 mb-2 d-block">
      {{ errorMessage }}
    </p>
    <div class="d-grid gap-2 mb-2">
      <button
        type="submit"
        class="btn btn-gray-dark border boder-dark rounded-3 text-white"
        :disabled="!formIsFinished">
        註冊
      </button>
    </div>
  </Form>
</template>

<script>
export default {
  name: 'NavSignUp',
  data () {
    return {
      user: {
        name: '', // 暱稱
        email: '', // 帳號
        password: '', // 密碼
        confirmPassword: '' // 確認密碼
      },
      errorMessage: ''
    }
  },
  emits: ['current-page'],
  computed: {
    formIsFinished () {
      return this.user.email && this.user.name && this.user.password && this.user.confirmPassword
    }
  },
  methods: {
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
    submitSignup () {
      this.$store.dispatch('updateLoading', true)
      const config = {
        method: 'POST',
        url: `${process.env.VUE_APP_APIPATH}/api/v1/user/register`,
        data: this.user
      }
      this.$http(config).then(response => {
        this.$store.dispatch('updateLoading', false)
        Object.assign(this.$data, this.$options.data())
        this.$emit('current-page', 'Login')
      }).catch(error => {
        this.$store.dispatch('updateLoading', false)
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
