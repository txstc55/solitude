import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'nav',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nav.vue')
  },
  {
    path: '/button',
    name: 'button',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Button.vue')
  },
  {
    path: '/exit',
    name: 'exit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Exit.vue')
  },
  {
    path: '/loneliness',
    name: 'loneliness',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  },
  {
    path: '/abc',
    name: 'abc',
    component: () => import('../views/ABC.vue')
  },
  {
    path: '/qa',
    name: 'qa',
    component: () => import('../views/Qanda.vue')
  },
  {
    path: '/infinity',
    name: 'infinity',
    component: () => import('../views/Infinity.vue')
  },
  {
    path: '/translate',
    name: 'translate',
    component: () => import('../views/Translate.vue')
  },
  {
    path: '/philosophy',
    name: 'philosophy',
    component: () => import('../views/Philosophy.vue')
  },
  {
    path: '/chatbox',
    name: 'chatbox',
    component: () => import('../views/ChatBox.vue')
  },
  {
    path: '/confession',
    name: 'confession',
    component: () => import('../views/Confession.vue')
  },
  {
    path: '/github',
    beforeEnter() { location.href = 'http://txstc55.github.io' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
