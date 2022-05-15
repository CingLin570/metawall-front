import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: '貼文牆頁',
        component: () => import('../views/Wall.vue')
      },
      {
        path: 'personal',
        name: '個人貼文牆頁',
        component: () => import('../views/Personal.vue')
      },
      {
        path: '/profile',
        name: '個人資料頁',
        component: () => import('../views/Profile.vue')
      },
      {
        path: '/like',
        name: '我按讚文章頁',
        component: () => import('../views/Like.vue')
      },
      {
        path: '/follower',
        name: '追隨名單頁',
        component: () => import('../views/Follower.vue')
      },
      {
        path: '/post',
        name: '張貼動態頁',
        component: () => import('../views/Post.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入頁面',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: '註冊頁面',
    component: () => import('../views/login/Register.vue')
  },
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '貼文牆頁'
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

export default router
