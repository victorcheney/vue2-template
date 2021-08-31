import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const moduleRoutes = []
const rst = require.context('./modules', true, /\.router\.js/)

rst.keys().forEach(item => {
  moduleRoutes.push(rst(item).default)
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...moduleRoutes,
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
