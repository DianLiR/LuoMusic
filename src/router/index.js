import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
      show_tab: true
    }
  },
  {
    path: '/hot',
    name: 'hot',
    meta: {
      keepAlive: true,
      show_tab: true
    },
    component: () => import('../views/LeaderBoard.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      keepAlive: true,
      show_tab: true
    },
    component: () => import('../views/User.vue'),
    beforeEnter: (to, from, next) => {
      // ...
      if (!store.state.is_login) next({ name: 'login' })
      // if (!store.state.is_login) next(router.push({ name: 'login' }))
      else next()
      /* let login = store.state.is_login
      console.log('🚀 ~ login', login)
      if (!login) {
        next({ path: '/login' })
      } else {
        next()
      } */
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hiddenHeader: true,
      keepAlive: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/video',
    name: 'video',
    meta: {
      keepAlive: true,
      show_tab: true,

      hiddenHeader: true
    },
    component: () => import('../views/VideoPage.vue')
  },
  {
    path: '/friends',
    name: 'friends',
    meta: {
      keepAlive: true,
      show_tab: true
    },
    component: () => import('../views/Friends.vue')
  },
  {
    path: '/song_list/:id',
    name: 'song_list',
    meta: {
      hiddenHeader: true
    },
    component: () => import('../views/SongList.vue')
  },
  {
    path: '/songs_detail/:id',
    name: 'songs',
    meta: {
      hiddenHeader: true
    },
    component: () => import('../components/Songs/Songs.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      keepAlive: false,
      hiddenHeader: true
    },
    component: () => import('../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
