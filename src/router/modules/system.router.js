/*
 * @Description: file content
 * @Author: chenfengtao
 * @Date: 2021-06-30 16:22:15
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-07-06 17:15:26
 */

/**
 * @type {import('vue-router').RouteConfig}
 */
const routes = {
  name: 'system',
  path: '/system',
  meta: {
    auth: true
  },
  component: () => import('@/views/System')
}

export default routes
