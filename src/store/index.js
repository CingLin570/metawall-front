import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import router from '@/router'

const ls = new SecureLS({ isCompression: false })
function initialState () {
  return {
    token: '',
    info: {} // 會員資訊
  }
}

export default createStore({
  plugins: [createPersistedState({
    key: 'metawall',
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    },
    // 只儲存特定資料
    reducer (val) {
      return {
        token: val.token,
        info: val.info
      }
    }
  }
  )],
  // 存放數據
  state: {
    initialState,
    isLoading: false
  },
  // 唯一可以同步修改state的地方
  mutations: {
    updateLoading (state, status) {
      state.isLoading = status
    },
    setInfo (state, response) { // 取得會員資訊
      state.info = response
    },
    setToken (state, token) { // 取得 token
      state.token = token
    },
    resetState (state) {
      router.push({ name: 'Login' })
      Object.assign(state, initialState())
    }
  },
  // 非同步事件只能寫在 actions(不能直接改變 state)
  actions: {
  },
  // 類似於使用computed，過濾 state
  getters: {
  },
  modules: {
  }
})
