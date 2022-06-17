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
          <p class="h4 mb-3 text-center" v-if="currentPage === 'Login'">到元宇宙展開全新社交圈</p>
          <p class="h4 mb-3 text-center" v-else>註冊</p>
            <!-- tab-content -->
            <div>
              <keep-alive>
                <component :is="currentTabComponent" @current-page="changePage"></component>
              </keep-alive>
            </div>
            <div class="d-grid gap-2 mb-2">
              <template v-for="item in tabs" :key="item.tabId">
              <a class="btn rounded-3"
                v-if="item.modal !== currentPage"
                :id="item.tabId"
                :href="`#${item.contentId}`"
                @click.prevent="currentPage = item.modal">
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
      errorMessage: '',
      currentPage: 'Login', // 預設登入頁
      tabs: [ // 切換登入or註冊
        {
          tabId: 'login-tab',
          contentId: 'login',
          name: '登入',
          modal: 'Login'
        },
        {
          tabId: 'signup-tab',
          contentId: 'signup',
          name: '註冊帳號',
          modal: 'SignUp'
        }
      ]
    }
  },
  computed: {
    currentTabComponent () {
      return 'Nav' + this.currentPage
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
    }
  }
}
</script>

<style>
</style>
