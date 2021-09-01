import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/routerGuard'
import components from './components/index'
import './plugins/element.js'

Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
