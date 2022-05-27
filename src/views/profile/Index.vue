<template>
  <section class="container mt-7 px-lg-12">
    <div class="row">
      <div class="col-md-7">
        <div class="card mb-5 rounded-0 border-2 position-relative">
          <h2 class="text-center fw-bold py-3 mb-0 fs-5">修改個人資料</h2>
          <div
            class="position-absolute border border-dark border-2 w-100 py-4"
            style="z-index: -1; top: 10px; left: -6px"
          ></div>
        </div>
        <div class="card bg-transparent border-0">
          <div class="card-header bg-transparent border-0">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li
                v-for="tab in tabs"
                :key="tab.modal"
                class="
                  nav-item
                  border border-dark border-2 border-bottom-0
                  rounded bg-white
                "
                role="presentation"
              >
                <button
                  class="nav-link nav-tabs"
                  :class="{ active: currentTab === tab.modal }"
                  type="button"
                  @click="currentTab = tab.modal"
                >
                  {{ tab.name }}
                </button>
              </li>
            </ul>
          </div>
          <div
            class="tab-content border border-dark border-2 rounded"
            id="myTabContent"
          >
            <div
              class="tab-pane"
              :class="{ 'show active': currentTabComponent }"
              id="name-edit"
              role="tabpanel"
              aria-labelledby="name-edit"
            >
              <!-- tab-content -->
              <keep-alive>
                <component :is="currentTabComponent"></component>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
    <SidebarSm></SidebarSm>
  </section>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import SidebarSm from '../../components/SidebarSm.vue'
import EditProfile from './components/EditProfile.vue'
import EditPassword from './components/EditPassword.vue'

export default {
  name: 'profile',
  components: {
    Sidebar,
    SidebarSm,
    EditProfile,
    EditPassword
  },
  data () {
    return {
      currentTab: 'Profile',
      tabs: [
        {
          name: '暱稱修改',
          modal: 'Profile'
        },
        {
          name: '重設密碼',
          modal: 'Password'
        }
      ]
    }
  },
  computed: {
    currentTabComponent () {
      return 'Edit' + this.currentTab
    }
  }
}
</script>

<style>
</style>
