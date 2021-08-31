/*
 * @Description: 全局路由守卫
 * @Author: chenfengtao
 * @Date: 2021-07-06 17:01:52
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-07-07 11:12:01
 */
import router from './index'
import { getToken } from '@/utils/token'

const isAuthenticated = getToken()

router.beforeEach((to, from, next) => {
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
    next()
  }
})
