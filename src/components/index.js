/*
 * @Description: 动态注册全局组件
 * @Author: chenfengtao
 * @Date: 2021-07-07 10:13:38
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-07-07 10:17:59
 */
const allComponents = require.context('./', true, /\.vue$/)

export default Vue => {
  allComponents.keys().forEach(item => {
    Vue.component(item.replace(/\.\//, '').replace(/\.vue$/, ''), allComponents(item).default)
  })
}
