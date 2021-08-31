/*
 * @Description: 封装axios
 * @Author: chenfengtao
 * @Date: 2021-02-20 10:12:04
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-06-09 10:47:54
 */

import axiox from 'axios'
// import { Message } from 'element-ui'
// import { getToken } from './cookies'
import router from '@/router/index'

const CancelToken = axiox.CancelToken
const queue = [] // 请求队列

const service = axiox.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10 * 60 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
})

// 取消重复请求
const removeRepeatRequest = (config) => {
  for (const key in queue) {
    const index = +key
    const item = queue[key]

    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      item.cancel('操作太频繁，请稍后再试')
      queue.splice(index, 1)
    }
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 请求头添加token
    // const token = getToken()
    // if (token) {
    //   config.headers.Authorization = token
    // }

    removeRepeatRequest(config)

    config.cancelToken = new CancelToken((c) => {
      queue.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    removeRepeatRequest(response.config)

    if (res.code !== 200) {
      switch (res.code) {
        case 201:
          // Message({ type: 'error', message: res?.msg })
          break
        case 206:
          // 旧密码不正确
          break
        case 401:
          // token无效，返回登陆页
          router.push({
            path: '/login',
            query: {
              redirect: location.pathname + location.search
            }
          })
          break
        case 403:
          // 无权限，跳转到无权限页面
          break
        case 500:
          // 服务器错误
          // Message({ type: 'error', message: res?.msg })
          break
      }

      // 文件下载返回的是Blob
      if (!res.code) {
        return res
      }

      return Promise.reject(new Error(res?.msg))
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
