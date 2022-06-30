<template>
<div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <h5 class="modal-title" id="staticBackdropLabel">提醒訊息</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        刪除後將無法復原，您是否確定刪除貼文？
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-outline-dark"
        @click="deletePost()">確定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeletePost',
  props: {
    deleteId: {
      type: [String, Number],
      require: true
    },
    deleteModal: {
      type: Object,
      default () { return {} }
    }
  },
  emits: ['delete'],
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  methods: {
    deletePost () {
      return new Promise((resolve, reject) => {
        this.$store.commit('updateLoading', true)
        const config = {
          method: 'DELETE',
          url: `${process.env.VUE_APP_APIPATH}/api/v1/post/${this.deleteId}`,
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
        this.$http(config)
          .then((res) => {
            this.$store.commit('updateLoading', false)
            this.deleteModal.hide()
            resolve(res.data.message)
            this.$emit('delete')
          })
          .catch((error) => {
            this.$store.commit('updateLoading', false)
            this.deleteModal.hide()
            reject(error.response.data.message)
          })
      })
    }
  }
}
</script>

<style>

</style>
