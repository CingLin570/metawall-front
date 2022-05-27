<template>
  <div
    class="
      SidebarSm
      list-group
      border border-dark
      rounded-pill
      fixed-bottom
      bg-secondary
      d-md-none
      mx-1
      mb-2
    "
  >
    <ul class="d-flex justify-content-around mb-0 ps-0">
      <li class="list-group-item border-0 bg-secondary">
        <a href="#">
          <div
            class="btn rounded-circle border border-dark border-2 p-2 bg-white"
          >
            <i class="bi bi-house-door fs-5"></i>
          </div>
        </a>
      </li>
      <li class="list-group-item border-0 bg-secondary">
        <a href="#">
          <div
            class="btn rounded-circle border border-dark border-2 p-2 bg-white"
          >
            <i class="bi bi-bell fs-5"></i>
          </div>
        </a>
      </li>
      <li class="list-group-item border-0 bg-secondary">
        <a href="#">
          <div
            class="btn rounded-circle border border-dark border-2 p-2 bg-white"
          >
            <i class="bi bi-hand-thumbs-up fs-5"></i>
          </div>
        </a>
      </li>
      <li class="list-group-item border-0 bg-secondary">
        <a href="#">
          <div
            class="
              btn
              rounded-circle
              border border-dark border-2
              p-2
              bg-primary
            "
          >
            <i class="bi bi-plus-circle text-white fs-5"></i>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarSm'
}
</script>

<style lang="scss">
.SidebarSm {
  .btn {
    width: 3rem;
    height: 3rem;
  }
}
</style>
