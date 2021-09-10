/*
 * @Description: file content
 * @Author: chenfengtao
 * @Date: 2021-07-09 16:13:46
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-10 16:51:42
 */
import BaseAPI from '../BaseAPI'

class LoginAPI extends BaseAPI {
  // 登录
  login (data) {
    return this.post('/login', data)
  }

  // 获取信息
  getUserInfo (data) {
    return this.post('/getUserInfo', data)
  }

  // 获取信息
  logout (data) {
    return this.post('/logout', data)
  }
}
export default new LoginAPI()
