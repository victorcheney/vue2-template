import { getToken, setToken, removeToken } from '@/utils/token'
import { LoginAPI } from '@/api'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      LoginAPI.login({ username: username.trim(), password }).then(resp => {
        const { data } = resp
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取信息
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      LoginAPI.getUserInfo({ token: state.token }).then(resp => {
        const { data } = resp

        const { name, avatar, roles } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      LoginAPI.logout().then(resp => {
        const { msg } = resp
        commit('SET_ROLES', [])
        commit('SET_TOKEN', '')
        removeToken()
        console.log(msg)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token
  resetToken ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', [])
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
