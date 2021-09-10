/*
 * @Description: validate
 * @Author: chenfengtao
 * @Date: 2021-09-09 14:37:04
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-09 14:44:08
 */

// 验证用户名 数字字母下划线，数字字母必须同时存在
export function isValidUsername (str) {
  const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z]{4,15}$/
  return reg.test(str)
}

// 验证密码 字母开头长度6-18位，包含字母数字下划线
export function isValidPassword (str) {
  const reg = /^[A-Za-z]\w{6,18}$/
  return reg.test(str)
}
