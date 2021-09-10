/*
 * @Description: 路由权限
 * @Author: chenfengtao
 * @Date: 2021-09-10 14:43:29
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-10 15:35:32
 */
import { asyncRoutes, constantRoutes } from '@/router'

function isMatched (route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 根据角色过滤有权限的路由
function filterAysncRoutes (asyncRoutes, roles) {
  const rst = []

  asyncRoutes.forEach(route => {
    const temp = { ...route }
    if (isMatched(route, roles)) {
      if (temp.children) {
        temp.children = filterAysncRoutes(temp.children, roles)
      }
      rst.push(temp)
    }
  })
  return rst
}

const state = {
  routes: [],
  addedRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addedRoutes = routes
    state.routes = [...constantRoutes, ...routes]
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessRoutes = []
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAysncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
