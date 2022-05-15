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
          <div class="card bg-white border-0">
            <div class="card-header bg-white border-0">
              <ul
                class="nav nav-tabs card-header-tabs"
                id="myTab"
                role="tablist"
              >
                <li
                  class="nav-item border border-dark border-2 border-bottom-0 rounded"
                  role="presentation"
                >
                  <button
                    class="nav-link nav-tabs active"
                    id="name-edit-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#name-edit"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    暱稱修改
                  </button>
                </li>
                <li
                  class="nav-item border border-dark border-2 border-bottom-0 rounded"
                  role="presentation"
                >
                  <button
                    class="nav-link nav-tabs"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Profile
                  </button>
                </li>
              </ul>
            </div>
            <div
              class="tab-content border border-dark border-2 rounded"
              id="myTabContent"
            >
              <div
                class="tab-pane fade show active"
                id="name-edit"
                role="tabpanel"
                aria-labelledby="name-edit"
              >
                <div class="card-body px-10 py-5">
                  <from class="needs-validation" novalidate>
                    <img
                      src="~@/assets/img/user.png"
                      alt="user"
                      class="img-fluid w-50 mx-auto mb-4 d-block"
                    />
                    <div class="input-group mb-3">
                      <label class="btn btn-dark mx-auto">
                        <input
                          id="upload_img"
                          style="display: none"
                          type="file"
                          class="is-valid"
                        />
                        上傳大頭照
                      </label>
                    </div>
                    <div class="mb-3">
                      <label for="editName" class="form-label">暱稱</label>
                      <input
                        type="text"
                        class="form-control"
                        id="editName"
                        value="邊緣小杰"
                      />
                    </div>
                    <p class="mb-0">性別</p>
                    <div class="d-flex mb-5">
                      <div class="form-check me-4">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                        />
                        <label class="form-check-label" for="male">
                          男性
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked
                        />
                        <label class="form-check-label" for="female">
                          女性
                        </label>
                      </div>
                    </div>
                    <p class="text-center text-danger fs-7 d-none">
                      1.圖片寬高比必需為 1:1，請重新輸入 <br />2. 解析度寬度至少
                      300像素以上，請重新輸入
                    </p>
                    <div class="d-grid">
                      <button
                        type="submit"
                        class="btn btn-primary border border-dark border-2 shadow-black"
                      >
                        送出更新
                      </button>
                    </div>
                  </from>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div class="card-body px-10 py-5">
                  <from class="needs-validation" novalidate>
                    <div class="mb-3">
                      <label for="newPassword" class="form-label"
                        >輸入新密碼</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="newPassword"
                        placeholder="請輸入新密碼"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="confirmPassword" class="form-label"
                        >再次輸入</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="confirmPassword"
                        placeholder="再次輸入新密碼"
                      />
                    </div>
                    <div class="d-grid">
                      <button
                        type="submit"
                        class="btn btn-gray-dark border border-dark border-2 shadow-black"
                      >
                        重設密碼
                      </button>
                    </div>
                  </from>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Sidebar></Sidebar>
      </div>
    </section>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'profile',
  components: {
    Sidebar
  }
}
</script>

<style>

</style>
