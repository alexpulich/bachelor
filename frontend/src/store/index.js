import Vue from 'vue'
import Vuex from 'vuex'
import climbingwalls from './modules/climbingwalls'
import auth from './modules/auth'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    climbingwalls,
    auth
  },
})
