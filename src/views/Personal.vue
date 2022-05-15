<template>
    <section class="container mt-7 px-lg-12">
      <div class="row">
        <div class="col-md-7">
          <div class="card mb-5 rounded-0 border-2 position-relative">
            <div class="d-flex align-items-center">
              <img
                src="~@/assets/img/user6.png"
                alt="user6"
                class="p-4 bg-secondary me-1 img-fluid"
              />
              <div class="d-flex justify-content-between w-100">
                <div>
                  <p class="mb-0 fw-bold">阿爾敏</p>
                  <small>987,987 人追蹤</small>
                </div>
                <button
                  type="button"
                  class="btn btn-warning me-2 px-4 shadow-black d-none"
                >
                  追蹤
                </button>
                <button
                  type="button"
                  class="btn btn-gray-light me-2 px-4 shadow-black"
                >
                  取消追蹤
                </button>
              </div>
            </div>
            <div
              class="position-absolute border border-dark border-2 w-100 py-6"
              style="z-index: -1; top: 10px; left: -6px"
            ></div>
          </div>
          <div class="row">
            <div class="col-md-4 pe-1 mb-md-2 mb-3">
              <select id="newPost" class="form-select py-2">
                <option selected>最新貼文</option>
                <option>...</option>
              </select>
            </div>
            <div class="col-md-8">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="搜尋貼文"
                  aria-label="search"
                  aria-describedby="button-search"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  id="button-search"
                >
                  <i class="bi bi-search fs-5"></i>
                </button>
              </div>
            </div>
          </div>
          <ul class="ps-0">
            <li class="card h-100 py-4 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex align-items-center mb-3">
                <img class="me-3 img-fluid" src="~@/assets/img/user6.png" alt="user6" />
                <div class="d-flex flex-column mt-2">
                  <a href="#" class="mb-0 fw-bold">阿爾敏</a>
                  <small class="text-muted">2022/1/10 12:00</small>
                </div>
              </div>
              <p>今天找到一張大海的照片<br />太美拉～～～</p>
              <img src="~@/assets/img/photo3.png" alt="photo2" class="img-fluid" />
            </li>
            <li class="card h-100 py-4 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex align-items-center mb-3">
                <img class="me-3" src="~@/assets/img/user6.png" alt="user6" />
                <div class="d-flex flex-column mt-2">
                  <a href="#" class="mb-0 fw-bold">阿爾敏</a>
                  <small class="text-muted">2022/1/10 12:00</small>
                </div>
              </div>
              <p>各位我有一個作戰計畫</p>
            </li>
          </ul>
        </div>
  <Sidebar></Sidebar>
      </div>
  <SidebarSm></SidebarSm>
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import SidebarSm from '../components/SidebarSm.vue'

export default {
  name: 'personal',
  components: {
    Sidebar,
    SidebarSm
  }
}
</script>

<style>

</style>
