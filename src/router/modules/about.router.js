/*
 * @Description: file content
 * @Author: chenfengtao
 * @Date: 2021-06-30 16:22:15
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-09 17:03:32
 */

/**
 * @type {import('vue-router').RouteConfig}
 */
const routes = {
  path: '/about',
  name: 'About',
  component: () => import('@/views/About.vue'),
  meta: {
    roles: ['user']
  }
}

export default routes
