import Vue from 'vue'
import VueRouter from 'vue-router'
import Encoder from '../views/Encoder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Encoder',
    component: Encoder
  },
  {
    path: '/decode',
    name: 'Décoder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Decoder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
