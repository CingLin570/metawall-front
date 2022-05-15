<template>
    <section class="container mt-7 px-lg-12">
      <div class="row">
        <div class="col-md-7">
          <div class="card mb-5 rounded-0 border-2 position-relative">
            <h2 class="text-center fw-bold py-3 mb-0 fs-5">追蹤名單</h2>
            <div
              class="position-absolute border border-dark border-2 w-100 py-4"
              style="z-index: -1; top: 10px; left: -6px"
            ></div>
          </div>
          <ul class="ps-0">
            <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex justify-content-between align-items-end">
                <div class="d-flex align-items-center">
                  <img
                    class="me-3 img-fluid"
                    src="~@/assets/img/user2.png"
                    alt="user2"
                  />
                  <div class="d-flex flex-column mt-2">
                    <a href="#" class="mb-0 fw-bold">愛爾敏</a>
                    <small class="text-muted">追蹤時間：2022/2/14 12:00</small>
                  </div>
                </div>
                <div>
                  <p class="mb-0 fs-8">您已追蹤 90 天！</p>
                </div>
              </div>
            </li>
            <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex justify-content-between align-items-end">
                <div class="d-flex align-items-center">
                  <img
                    class="me-3 img-fluid"
                    src="~@/assets/img/user6.png"
                    alt="user6"
                  />
                  <div class="d-flex flex-column mt-2">
                    <a href="#" class="mb-0 fw-bold">李維</a>
                    <small class="text-muted">追蹤時間：2022/2/14 12:00</small>
                  </div>
                </div>
                <div>
                  <p class="mb-0 fs-8">您已追蹤 90 天！</p>
                </div>
              </div>
            </li>
            <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex justify-content-between align-items-end">
                <div class="d-flex align-items-center">
                  <img
                    class="me-3 img-fluid"
                    src="~@/assets/img/user5.png"
                    alt="user5"
                  />
                  <div class="d-flex flex-column mt-2">
                    <a href="#" class="mb-0 fw-bold">米歇爾</a>
                    <small class="text-muted">追蹤時間：2022/2/14 12:00</small>
                  </div>
                </div>
                <div>
                  <p class="mb-0 fs-8">您已追蹤 90 天！</p>
                </div>
              </div>
            </li>
            <li class="card h-100 py-3 px-4 mb-3 border-2 shadow-black">
              <div class="d-flex justify-content-between align-items-end">
                <div class="d-flex align-items-center">
                  <img
                    class="me-3 img-fluid"
                    src="~@/assets/img/user4.png"
                    alt="user4"
                  />
                  <div class="d-flex flex-column mt-2">
                    <a href="#" class="mb-0 fw-bold">米卡莎</a>
                    <small class="text-muted">追蹤時間：2022/2/14 12:00</small>
                  </div>
                </div>
                <div>
                  <p class="mb-0 fs-8">您已追蹤 90 天！</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Sidebar></Sidebar>
      </div>
      <div
        class="list-group border border-dark rounded-pill fixed-bottom bg-secondary d-md-none mx-1"
      ></div>
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'follower',
  components: {
    Sidebar
  }
}
</script>

<style>

</style>
