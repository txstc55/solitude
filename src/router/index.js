import { createRouter, createWebHistory } from 'vue-router'
import Button from '../views/Button.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Button
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
    path: '/abc',
    name: 'abc',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ABC.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
