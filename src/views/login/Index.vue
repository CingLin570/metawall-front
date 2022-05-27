<template>
  <section class="vh-100 d-flex justify-content-center align-items-center">
    <div
      class="card px-lg-7 px-3 bg-secondary border-2 shadow-gray rounded-0"
      style="width: 56rem"
    >
      <div class="row py-lg-11">
        <div class="col-md-6 mr-9 d-md-block d-none">
          <img src="~@/assets/img/banner.png" alt="signin" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h1 class="mb-3 text-center text-primary metawall-logo">MetaWall</h1>
          <p class="h4 text-center">到元宇宙展開全新社交圈</p>
            <!-- tab-content -->
            <div v-for="item in tabs"
              :key="item.contentId" :id="item.contentId"
              :class="{ 'show active': currentPage === item.contentId }">
              <template v-if="currentPage === item.contentId">
                <keep-alive>
                <component :is="item.modal" @current-page="currentPage = $event"></component>
                </keep-alive>
              </template>
            </div>
            <div class="text-center">
              <template v-for="item in tabs">
              <a class="btn"
                :key="item.tabId"
                v-if="item.contentId !== currentPage"
                :id="item.tabId"
                :href="`#${item.contentId}`"
                @click.prevent="currentPage = item.contentId">
                {{ item.name }}
              </a>
            </template>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavLogin from './components/Login.vue'
import NavSignUp from './components/SignUp.vue'

export default {
  name: 'login',
  components: {
    NavLogin,
    NavSignUp
  },
  data () {
    return {
      user: {
        email: '',
        pasword: ''
      },
      errorMessage: '',
      currentPage: 'login', // 預設登入頁
      tabs: [ // 切換登入or註冊
        {
          tabId: 'login-tab',
          contentId: 'login',
          name: '登入',
          modal: 'NavLogin'
        },
        {
          tabId: 'signup-tab',
          contentId: 'signup',
          name: '註冊帳號',
          modal: 'NavSignUp'
        }
      ]
    }
  }
}
</script>

<style>
</style>
