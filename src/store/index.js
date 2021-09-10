import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters'

Vue.use(Vuex)

// modules
const files = require.context('./modules', true, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  getters,
  modules
})
