<template>
  <div class="card border-2 shadow-black">
    <div class="card-header bg-white">
      <div class="d-flex">
        <div
          class="p-1 bg-danger border border-light rounded-circle me-1"
        ></div>
        <div
          class="p-1 bg-success border border-light rounded-circle me-1"
        ></div>
        <div
          class="
            p-1
            rounded-circle
            border border-light
            rounded-circle
            bg-warning
          "
        ></div>
      </div>
    </div>
    <div class="card-body py-5">
      <p class="card-text text-muted text-center">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPostsCard',
  props: {
    message: String
  }
}
</script>

<style>

</style>
