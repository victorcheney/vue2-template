/*
 * @Description: token相关方法
 * @Author: chenfengtao
 * @Date: 2021-07-06 17:09:41
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-09 14:11:37
 */
const KEY = 'AUTHTOKEN'

export const getToken = () => {
  return localStorage.getItem(KEY)
}

export const setToken = (token) => {
  localStorage.setItem(KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(KEY)
}
