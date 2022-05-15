<template>
      <section class="vh-100 d-flex justify-content-center align-items-center">
      <div
        class="card px-lg-7 px-3 bg-secondary border-2 shadow-gray rounded-0"
        style="width: 56rem"
      >
        <div class="row py-lg-11">
          <div class="col-md-6 mr-9 d-md-block d-none">
            <img src="~@/assets/img/banner.png" alt="login" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h1 class="mb-3 m-auto d-block overflow-hidden text-nowrap logo">
              MetaWall
            </h1>
            <p class="text-center">到元宇宙展開全新社交圈</p>
            <form method="" class="needs-validation" novalidate>
              <div class="form-group mb-2">
                <label for="userName"></label>
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  placeholder="暱稱"
                  required
                />
                <small class="invalid-feedback mb-2">
                  暱稱至少 2 個字元以上
                </small>
              </div>
              <div class="form-group mb-2">
                <label for="userEmail"></label>
                <input
                  type="email"
                  class="form-control"
                  id="userEmail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  required
                />
                <small class="invalid-feedback mb-2">
                  帳號已被註冊，請替換新的 Email！
                </small>
              </div>
              <div class="form-group mb-5">
                <label for="userPassword"></label>
                <input
                  type="password"
                  class="form-control"
                  id="userPassword"
                  placeholder="Password"
                  name="password"
                  required
                />
                <small class="invalid-feedback mb-2">
                  密碼需至少 8 碼以上，並中英混合
                </small>
              </div>
              <div class="d-grid gap-2 mb-2">
                <button
                  type="submit"
                  class="btn btn-gray-dark border boder-dark rounded-3 text-white"
                >
                  註冊
                </button>
              </div>
              <div class="text-center">
                <router-link to="/login">登入</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'register'
}
</script>

<style>

</style>
