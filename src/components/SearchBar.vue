<template>
  <div class="row">
    <div class="col-md-4 pe-md-1 mb-md-2 mb-3">
      <select
        id="newPost"
        class="form-select py-2"
        v-model="search.timeSort"
        @change="sendSearch"
      >
        <option selected value="desc">最新貼文</option>
        <option value="asc">最舊貼文</option>
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
          v-model="search.q"
          @keyup.enter="sendSearch"
        />
        <button
          class="btn btn-primary fs-5 rounded-0 px-3 border-dark"
          type="button"
          id="button-search"
          @click="sendSearch"
        >
          <i class="bi bi-search fs-5"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      search: {
        timeSort: 'desc', // 排序(預設降冪)
        q: '' // 關鍵字
      }
    }
  },
  emits: ['search'],
  created () {
    this.sendSearch()
  },
  methods: {
    sendSearch () {
      this.$emit('search', this.search)
    }
  }
}
</script>

<style>

</style>
