<template>
  <div class="col-md-5 d-md-block d-none">
    <div class="Sidebar-card bg-white border border-dark border-2 px-4 py-5">
      <div class="d-grid gap-2 mb-4">
        <router-link
          to="/post"
          class="btn btn-primary shadow-black rounded-3 py-2 fs-5 border-dark"
        >
          張貼動態
        </router-link>
      </div>
      <ul class="ps-0">
        <li class="card h-100 border-0 mb-4">
          <router-link :to="{ name: '個人貼文牆頁', params: { id: info._id } }">
            <div class="d-flex align-items-center">
              <img
                class="img mx-3 img-fluid rounded-circle"
                :src="info.photo"
                :alt="info.name"
                v-if="info.photo"
              />
              <img
                class="img mx-3 img-fluid rounded-circle"
                src="~@/assets/img/user.png"
                alt="user2"
                v-else
              />
              <p class="my-auto fw-bold">{{ info.name }}</p>
            </div>
          </router-link>
        </li>
        <li class="card h-100 border-0 mb-4">
          <router-link to="/follower" class="hover-primary">
            <div class="media d-flex align-items-center">
              <div
                class="
                  btn-icon
                  rounded-circle
                  border border-dark border-2
                  p-2
                  mx-3
                  bg-light
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <i class="bi bi-bell fs-5"></i>
              </div>
              <p class="my-2 fw-bold">追蹤名單</p>
            </div>
          </router-link>
        </li>
        <li class="card h-100 border-0">
          <router-link to="/like" class="hover-primary">
            <div class="media d-flex align-items-center">
              <div
                class="
                  btn-icon
                  rounded-circle
                  border border-dark border-2
                  p-2
                  mx-3
                  bg-light
                  hover-primary
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <i class="bi bi-hand-thumbs-up fs-5"></i>
              </div>
              <p class="my-2 fw-bold">我按讚的文章</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Sidebar',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      info: state => state.info
    })
  }
}
</script>

<style lang="scss" scoped>
.Sidebar-card {
  .btn-icon {
    width: 50px;
    height: 50px;
  }
}
.img {
  height: 50px;
  width: 50px;
}
</style>
