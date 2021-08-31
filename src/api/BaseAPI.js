/*
 * @Description: 接口基类
 * @Author: chenfengtao
 * @Date: 2021-02-20 11:24:29
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-06-09 10:48:26
 */
import request from '@/utils/request'
import qs from 'qs'

export default class BaseAPI {
  get (url, params) {
    return request({ url, method: 'GET', params })
  }

  post (url, data, config) {
    let temp

    if (
      config &&
      config?.headers &&
      (config?.headers['Content-Type'].indexOf('application/json') !== -1 ||
        config?.headers['Content-Type'].indexOf('multipart/form-data') !== -1)
    ) {
      temp = data
    } else {
      temp = qs.stringify(data)
    }
    return request(Object.assign({ url, method: 'POST', data: temp }, config))
  }
}
