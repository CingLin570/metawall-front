<template>
  <div
    class="
      SidebarSm
      list-group
      border border-dark
      border-3
      rounded-pill
      fixed-bottom
      bg-secondary
      d-md-none
      mx-1
      mb-2
    "
  >
    <ul class="d-flex justify-content-evenly align-items-center mb-0 ps-0 py-2">
      <li class="list-group-item border-0 p-0 bg-secondary">
        <router-link :to="{ name: '首頁' }" class="btn rounded-circle border border-dark border-3
          bg-white d-flex align-items-center justify-content-center">
            <i class="bi bi-house-door fs-5"></i>
        </router-link>
      </li>
      <li class="list-group-item border-0 p-0 bg-secondary">
        <router-link :to="{ name: '追隨名單頁' }" class="btn rounded-circle border border-dark border-3
          bg-white d-flex align-items-center justify-content-center">
            <i class="bi bi-bell fs-5"></i>
        </router-link>
      </li>
      <li class="list-group-item border-0 p-0 bg-secondary">
        <router-link :to="{ name: '我按讚文章頁' }" class="btn rounded-circle border border-dark border-3
          bg-white d-flex align-items-center justify-content-center">
          <i class="bi bi-hand-thumbs-up fs-5"></i>
        </router-link>
      </li>
      <li class="list-group-item border-0 p-0 bg-secondary">
        <router-link :to="{ name: '張貼動態頁' }" class="btn rounded-circle border border-dark border-3
          bg-primary d-flex align-items-center justify-content-center">
          <i class="bi bi-plus-circle text-white fs-5"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarSm'
}
</script>

<style lang="scss" scoped>
// .SidebarSm {
//   .btn {
//     width: 3rem;
//     height: 3rem;
//   }
// }
</style>
