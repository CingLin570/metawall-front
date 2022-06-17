import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index'
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('@/views/Wall.vue')
      },
      {
        path: 'personal/:id',
        name: '個人貼文牆頁',
        component: () => import('@/views/Personal.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        }
      },
      {
        path: 'post/:id',
        name: '單筆貼文頁',
        component: () => import('@/views/SinglePost.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        }
      },
      {
        path: '/profile',
        name: '個人資料頁',
        component: () => import('@/views/profile/Index.vue')
      },
      {
        path: '/like',
        name: '我按讚文章頁',
        component: () => import('@/views/Like.vue')
      },
      {
        path: '/follower',
        name: '追隨名單頁',
        component: () => import('@/views/Follower.vue')
      },
      {
        path: '/post',
        name: '張貼動態頁',
        component: () => import('@/views/Post.vue')
      }
    ]
  },
  {
    path: '/oauth',
    name: '第三方登入導頁',
    meta: { requiresAuth: false },
    component: () => import('@/views/Oauth.vue')
  },
  {
    path: '/login',
    name: '登入頁面',
    meta: { requiresAuth: false },
    component: () => import('@/views/login/Index.vue')
  },
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '首頁'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, scrollBehavior) {
    return {
      top: 0
    }
  }
})
// 使用 router.beforeEach 註冊一個全域性前置守衛，判斷使用者是否登陸
router.beforeEach((to, from) => {
  try {
    // 判斷是否登入
    const token = store.state.token
    // 判斷是否需要驗證
    const isMatched = to.matched.some(record => record.meta.requiresAuth)
    if (!token && isMatched) {
      return { name: '登入頁面' }
    } else {
      return true
    }
  } catch (error) {
    return { name: '登入頁面' }
  }
})

export default router
