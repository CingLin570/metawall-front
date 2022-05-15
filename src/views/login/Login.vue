<template>
  <section class="vh-100 d-flex justify-content-center align-items-center">
      <div
        class="card px-lg-7 px-3 bg-secondary border-2 shadow-gray rounded-0"
        style="width: 56rem"
      >
        <div class="row py-lg-11">
          <div class="col-md-6 mr-9 d-md-block d-none">
            <img src="~@/assets/img/banner.png" alt="signin" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h1 class="mb-3 text-center text-primary metawall-logo">
              MetaWall
            </h1>
            <p class="h4 text-center">到元宇宙展開全新社交圈</p>
            <form method="">
              <div class="form-group mb-2">
                <label for="userEmail"></label>
                <input
                  type="email"
                  class="form-control"
                  id="userEmail"
                  aria-describedby="emailHelp"
                  name="email"
                  placeholder="Email"
                  required
                />
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
              </div>
              <p class="text-danger text-center fs-7 mb-2 d-none">
                帳號或密碼錯誤，請重新輸入！
              </p>
              <div class="d-grid gap-2 mb-2">
                <button
                  type="submit"
                  class="btn btn-primary shadow-black rounded-3"
                >
                  登入
                </button>
              </div>
              <div class="text-center">
                <router-link to="/register">註冊帳號</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style>

</style>
