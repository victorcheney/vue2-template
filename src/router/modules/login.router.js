/*
 * @Description: file content
 * @Author: chenfengtao
 * @Date: 2021-06-30 16:22:15
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-07-06 15:04:04
 */

/**
 * @type {import('vue-router').RouteConfig}
 */
const routes = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/Login')
}

export default routes
