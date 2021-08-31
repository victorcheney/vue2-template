/*
 * @Description: file content
 * @Author: chenfengtao
 * @Date: 2021-07-09 16:13:46
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-07-12 10:46:16
 */
import BaseAPI from '../BaseAPI'

class LoginAPI extends BaseAPI {
  // 登录
  login (data) {
    return this.post('/login', data)
  }
}
export default new LoginAPI()
