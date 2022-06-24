<template>
  <section>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        fixed-top
        border-bottom border-3 border-dark
        bg-white
      "
    >
      <div class="container px-lg-12">
        <h1 class="font-paytone">
          <a class="navbar-brand fs-1" href="#">MetaWall</a>
        </h1>
        <div class="d-flex align-items-center">
          <img
            :src="info.photo"
            alt="user1"
            class="img img-fluid rounded-circle"
            v-if="info.photo"
          />
          <img
            class="img img-fluid rounded-circle"
            src="~@/assets/img/user.png"
            alt="user2"
            v-else
          />
          <div class="dropdown bg-white me-2">
            <button
              class="
                btn btn-white
                shadow-none
                border-0
                text-decoration-underline
                fw-bolder
                font-azeret
              "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Member
            </button>
            <ul
              class="
                dropdown-menu
                py-0
                border border-dark border-2
                rounded-0
                menu-shadow
                text-center
              "
              aria-labelledby="dropdownMenuButton1"
            >
              <li class="border-bottom border-dark border-2">
                <router-link :to="{ name: '個人貼文牆頁', params: { id: info._id } }" class="dropdown-item"
                  >我的貼文牆</router-link
                >
              </li>
              <li class="border-bottom border-dark border-2">
                <router-link to="/profile" class="dropdown-item"
                  >修改個人資料</router-link
                >
              </li>
              <li class="border-dark border-2">
                <router-link to="/login" class="dropdown-item"
                @click.prevent="logout"
                  >登出</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </section>
  <div class="py-3 py-md-5"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Navigation',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      info: state => state.info
    })
  },
  methods: {
    ...mapMutations(['setInfo', 'setToken']),
    logout () {
      this.setToken()
      this.$router.push({ name: '登入頁面' })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-shadow {
  box-shadow: 5px 5px 0 -2px #fff, 5px 5px 0 0 #000400;
}
.img {
  height: 50px;
  width: 50px;
}
</style>
