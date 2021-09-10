import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const moduleRoutes = []
const rst = require.context('./modules', true, /\.router\.js/)

rst.keys().forEach(item => {
  moduleRoutes.push(rst(item).default)
})

Vue.use(VueRouter)

// export 需要动态添加的模块路由
export const asyncRoutes = moduleRoutes

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
