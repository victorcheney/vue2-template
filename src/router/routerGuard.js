/*
 * @Description: 全局路由守卫
 * @Author: chenfengtao
 * @Date: 2021-07-06 17:01:52
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-10 17:07:09
 */
import router from './index'
import { getToken } from '@/utils/token'

import store from '../store'

const isAuthenticated = getToken()

function addAsyncRoutes (routes) {
  routes.forEach(route => {
    router.addRoute(route)
    if (route.children) {
      addAsyncRoutes(route.children)
    }
  })
}

router.beforeEach(async (to, from, next) => {
  // 未登录
  if (to.name !== 'login' && !isAuthenticated) {
    if (to.meta.auth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') {
      next()
    }
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      try {
        // TODO 获取用户信息，根据角色动态加载路由
        const { roles } = await store.dispatch('user/getInfo')

        // 根据角色动态加载路由
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

        // 注册到路由实例
        addAsyncRoutes(accessRoutes)
        router.addRoute({
          path: '*',
          component: () => import('@/views/Error/404.vue')
        })

        next({ ...to, replace: true })
      } catch (err) {
        // 清空token
        await store.dispatch('user/resetToken')
        // 跳转到登录页
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  }
})
