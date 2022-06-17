<template>
    <div class="card-body bg-white px-10 py-5">
      <Form v-slot="{ errors }" class="needs-validation">
        <div class="mb-3">
          <label for="newPassword" class="form-label">輸入新密碼</label>
          <Field
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors['password'] }"
            name="password"
            id="newPassword"
            placeholder="請輸入新密碼"
            :rules="validatePassword"
            v-model="user.password"
          />
          <error-message name="password" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">再次輸入</label>
          <Field
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors['confirmPassword'] }"
            id="confirmPassword"
            placeholder="再次輸入新密碼"
            name="confirmPassword"
            rules="required|confirmed:@password"
            v-model="user.confirmPassword"
          />
          <error-message name="confirmPassword" class="invalid-feedback"></error-message>
        </div>
        <div class="d-grid">
          <button
            type="button"
            class="btn btn-gray-dark border border-dark border-2 shadow-blac mb-2"
            :disabled="!formIsFinished"
            @click="submit()"
          >
            重設密碼
          </button>
          <p
              v-if="errorMessage"
              class="text-danger text-center mb-2 fs-7 d-block"
            >
              {{ errorMessage }}
          </p>
        </div>
      </Form>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EditPassword',
  data () {
    return {
      user: {
        password: '',
        confirmPassword: ''
      },
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.token
    }),
    formIsFinished () {
      return this.user.password && this.user.confirmPassword
    }
  },
  methods: {
    ...mapMutations(['setToken']),
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
    submit () {
      this.$store.dispatch('updateLoading', true)
      const config = {
        method: 'PATCH',
        url: `${process.env.VUE_APP_APIPATH}/api/v1/user/updatePassword`,
        headers: {
          authorization: `Bearer ${this.token}`
        },
        data: this.user
      }
      this.$http(config)
        .then((res) => {
          this.$store.dispatch('updateLoading', false)
          this.setToken(res.data.user.token)
          Object.assign(this.$data, this.$options.data())
        })
        .catch((error) => {
          this.$store.dispatch('updateLoading', false)
          this.errorMessage = error.response.data.message
        })
    }
  }
}
</script>

<style>
</style>
